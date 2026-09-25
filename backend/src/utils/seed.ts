import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db';
import { User } from '../models/User';
import { Alert } from '../models/Alert';

async function seedDatabase() {
  await connectDB();
  console.log('[Seed] Starting database population...');

  try {
    // Seed Demo Users
    const passwordHash = await bcrypt.hash('password123', 10);
    const adminHash = await bcrypt.hash('admin123', 10);

    await User.deleteMany({});
    await User.create([
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
    await Alert.deleteMany({});
    await Alert.create([
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
  } catch (err) {
    console.error('[Seed Error]', err);
    process.exit(1);
  }
}

seedDatabase();
