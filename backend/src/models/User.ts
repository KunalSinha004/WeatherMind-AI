import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  profileImage?: string;
  preferredLocation: string;
  tempUnit: 'celsius' | 'fahrenheit';
  notificationSettings: {
    emailAlerts: boolean;
    pushAlerts: boolean;
    severeWeatherOnly: boolean;
  };
  savedCities: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profileImage: { type: String, default: '' },
  preferredLocation: { type: String, default: 'Bangalore' },
  tempUnit: { type: String, enum: ['celsius', 'fahrenheit'], default: 'celsius' },
  notificationSettings: {
    emailAlerts: { type: Boolean, default: true },
    pushAlerts: { type: Boolean, default: true },
    severeWeatherOnly: { type: Boolean, default: false }
  },
  savedCities: [{ type: String }]
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);
