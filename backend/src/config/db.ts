import mongoose from 'mongoose';
import { ENV } from './env';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error: any) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB instance at ${ENV.MONGODB_URI}.`);
    console.warn(`[MongoDB Warning] App will run with resilient in-memory fallback state.`);
  }
};
