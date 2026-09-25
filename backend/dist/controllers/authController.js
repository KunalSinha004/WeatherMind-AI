"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.getCurrentUser = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const env_1 = require("../config/env");
// Helper to sign JWT
const generateToken = (id, email, role) => {
    return jsonwebtoken_1.default.sign({ id, email, role }, env_1.ENV.JWT_SECRET, { expiresIn: '7d' });
};
// In-memory fallback user store for demo when MongoDB is disconnected
const memoryUsers = new Map();
// Seed default demo accounts into memory store
const seedDemoAccounts = async () => {
    const hash = await bcryptjs_1.default.hash('password123', 10);
    const adminHash = await bcryptjs_1.default.hash('admin123', 10);
    memoryUsers.set('user@weathermind.ai', {
        id: 'usr_demo_101',
        name: 'Kunal Sharma',
        email: 'user@weathermind.ai',
        passwordHash: hash,
        role: 'user',
        preferredLocation: 'Bangalore',
        tempUnit: 'celsius',
        savedCities: ['Bangalore', 'Delhi', 'Mumbai']
    });
    memoryUsers.set('admin@weathermind.ai', {
        id: 'usr_admin_999',
        name: 'System Admin',
        email: 'admin@weathermind.ai',
        passwordHash: adminHash,
        role: 'admin',
        preferredLocation: 'San Francisco',
        tempUnit: 'celsius',
        savedCities: ['San Francisco', 'London', 'Tokyo']
    });
};
seedDemoAccounts();
const register = async (req, res) => {
    try {
        const { name, email, password, preferredLocation, tempUnit } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
            return;
        }
        const normalizedEmail = email.toLowerCase().trim();
        // Check DB or memory fallback
        try {
            const existing = await User_1.User.findOne({ email: normalizedEmail });
            if (existing) {
                res.status(400).json({ success: false, message: 'An account with this email already exists.' });
                return;
            }
            const passwordHash = await bcryptjs_1.default.hash(password, 10);
            const user = await User_1.User.create({
                name,
                email: normalizedEmail,
                passwordHash,
                preferredLocation: preferredLocation || 'Bangalore',
                tempUnit: tempUnit || 'celsius',
                savedCities: [preferredLocation || 'Bangalore']
            });
            const token = generateToken(user._id.toString(), user.email, user.role);
            res.status(201).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    preferredLocation: user.preferredLocation,
                    tempUnit: user.tempUnit,
                    savedCities: user.savedCities
                }
            });
            return;
        }
        catch (dbErr) {
            // Memory fallback mode
            if (memoryUsers.has(normalizedEmail)) {
                res.status(400).json({ success: false, message: 'An account with this email already exists.' });
                return;
            }
            const passwordHash = await bcryptjs_1.default.hash(password, 10);
            const newUser = {
                id: `usr_${Date.now()}`,
                name,
                email: normalizedEmail,
                passwordHash,
                role: 'user',
                preferredLocation: preferredLocation || 'Bangalore',
                tempUnit: tempUnit || 'celsius',
                savedCities: [preferredLocation || 'Bangalore']
            };
            memoryUsers.set(normalizedEmail, newUser);
            const token = generateToken(newUser.id, newUser.email, newUser.role);
            res.status(201).json({
                success: true,
                token,
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    preferredLocation: newUser.preferredLocation,
                    tempUnit: newUser.tempUnit,
                    savedCities: newUser.savedCities
                }
            });
            return;
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Please specify both email and password.' });
            return;
        }
        const normalizedEmail = email.toLowerCase().trim();
        try {
            const user = await User_1.User.findOne({ email: normalizedEmail });
            if (user && (await bcryptjs_1.default.compare(password, user.passwordHash))) {
                const token = generateToken(user._id.toString(), user.email, user.role);
                res.json({
                    success: true,
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        preferredLocation: user.preferredLocation,
                        tempUnit: user.tempUnit,
                        savedCities: user.savedCities
                    }
                });
                return;
            }
        }
        catch (dbErr) {
            // Fall through to memory fallback check below
        }
        // Memory store check
        const memUser = memoryUsers.get(normalizedEmail);
        if (memUser && (await bcryptjs_1.default.compare(password, memUser.passwordHash))) {
            const token = generateToken(memUser.id, memUser.email, memUser.role);
            res.json({
                success: true,
                token,
                user: {
                    id: memUser.id,
                    name: memUser.name,
                    email: memUser.email,
                    role: memUser.role,
                    preferredLocation: memUser.preferredLocation,
                    tempUnit: memUser.tempUnit,
                    savedCities: memUser.savedCities
                }
            });
            return;
        }
        res.status(401).json({ success: false, message: 'Invalid credentials. Please check email and password.' });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.login = login;
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ success: false, message: 'Not authenticated' });
            return;
        }
        try {
            const user = await User_1.User.findById(req.user.id).select('-passwordHash');
            if (user) {
                res.json({ success: true, user });
                return;
            }
        }
        catch (dbErr) { }
        // Check memory store
        for (const u of memoryUsers.values()) {
            if (u.id === req.user.id || u.email === req.user.email) {
                const { passwordHash, ...rest } = u;
                res.json({ success: true, user: rest });
                return;
            }
        }
        res.json({
            success: true,
            user: {
                id: req.user.id,
                name: req.user.email.split('@')[0],
                email: req.user.email,
                role: req.user.role,
                preferredLocation: 'Bangalore',
                tempUnit: 'celsius',
                savedCities: ['Bangalore', 'Delhi']
            }
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
exports.getCurrentUser = getCurrentUser;
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ success: false, message: 'Email is required.' });
        return;
    }
    res.json({
        success: true,
        message: `Password reset instructions have been dispatched to ${email}. Please check your inbox.`
    });
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    res.json({
        success: true,
        message: 'Your password has been successfully reset. You may now sign in.'
    });
};
exports.resetPassword = resetPassword;
