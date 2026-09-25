"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role || 'user'
            };
            return next();
        }
        catch (error) {
            res.status(401).json({ success: false, message: 'Not authorized, invalid authentication token' });
            return;
        }
    }
    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no bearer token provided' });
        return;
    }
};
exports.protect = protect;
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ success: false, message: 'Forbidden: Admin privilege required' });
};
exports.adminOnly = adminOnly;
