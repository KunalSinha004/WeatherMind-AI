"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const Alert_1 = require("../models/Alert");
async function seedDatabase() {
    await (0, db_1.connectDB)();
    console.log('[Seed] Starting database population...');
    try {
        // Seed Demo Users
        const passwordHash = await bcryptjs_1.default.hash('password123', 10);
        const adminHash = await bcryptjs_1.default.hash('admin123', 10);
        await User_1.User.deleteMany({});
        await User_1.User.create([
            {
                name: 'Kunal Sharma',
                email: 'user@weathermind.ai',
                passwordHash,
                role: 'user',
                preferredLocation: 'Bangalore',
                tempUnit: 'celsius',
                savedCities: ['Bangalore', 'Delhi', 'Mumbai']
            },
            {
                name: 'System Admin',
                email: 'admin@weathermind.ai',
                passwordHash: adminHash,
                role: 'admin',
                preferredLocation: 'San Francisco',
                tempUnit: 'celsius',
                savedCities: ['San Francisco', 'London', 'Tokyo']
            }
        ]);
        console.log('[Seed] Created default users: user@weathermind.ai / admin@weathermind.ai');
        // Seed Severe Alerts
        await Alert_1.Alert.deleteMany({});
        await Alert_1.Alert.create([
            {
                title: 'Heavy Rainfall Warning',
                severity: 'High',
                type: 'Heavy Rain',
                description: 'Convective cloud build-up expected to yield intense localized downpours (25-40 mm/hr).',
                location: 'Bangalore, India',
                startTime: new Date(),
                expectedDuration: '4 Hours',
                active: true
            },
            {
                title: 'High Temperature Advisory',
                severity: 'Moderate',
                type: 'Extreme Heat',
                description: 'Afternoon heat index expected to touch 36°C with elevated solar UV exposure.',
                location: 'Delhi, India',
                startTime: new Date(),
                expectedDuration: '6 Hours',
                active: true
            }
        ]);
        console.log('[Seed] Created sample weather alerts.');
        console.log('[Seed] Database seeding completed successfully.');
        process.exit(0);
    }
    catch (err) {
        console.error('[Seed Error]', err);
        process.exit(1);
    }
}
seedDatabase();
