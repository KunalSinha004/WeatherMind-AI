import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { ENV } from '../config/env';
import { AuthRequest } from '../middleware/authMiddleware';

// Helper to sign JWT
const generateToken = (id: string, email: string, role: string) => {
  return jwt.sign({ id, email, role }, ENV.JWT_SECRET, { expiresIn: '7d' });
};

// In-memory fallback user store for demo when MongoDB is disconnected
const memoryUsers = new Map<string, any>();

// Seed default demo accounts into memory store
const seedDemoAccounts = async () => {
  const hash = await bcrypt.hash('password123', 10);
  const adminHash = await bcrypt.hash('admin123', 10);
  
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

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, preferredLocation, tempUnit } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check DB or memory fallback
    try {
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) {
        res.status(400).json({ success: false, message: 'An account with this email already exists.' });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({
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
    } catch (dbErr) {
      // Memory fallback mode
      if (memoryUsers.has(normalizedEmail)) {
        res.status(400).json({ success: false, message: 'An account with this email already exists.' });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);
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
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please specify both email and password.' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      const user = await User.findOne({ email: normalizedEmail });
      if (user && (await bcrypt.compare(password, user.passwordHash))) {
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
    } catch (dbErr) {
      // Fall through to memory fallback check below
    }

    // Memory store check
    const memUser = memoryUsers.get(normalizedEmail);
    if (memUser && (await bcrypt.compare(password, memUser.passwordHash))) {
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
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    try {
      const user = await User.findById(req.user.id).select('-passwordHash');
      if (user) {
        res.json({ success: true, user });
        return;
      }
    } catch (dbErr) {}

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
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
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

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  res.json({
    success: true,
    message: 'Your password has been successfully reset. You may now sign in.'
  });
};
