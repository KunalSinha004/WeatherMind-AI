import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  title: string;
  severity: 'Extreme' | 'High' | 'Moderate' | 'Info';
  type: 'Heavy Rain' | 'Thunderstorm' | 'Extreme Heat' | 'Strong Wind' | 'Flood Risk' | 'Cold Wave' | 'High UV' | 'Poor Visibility';
  description: string;
  location: string;
  startTime: Date;
  expectedDuration: string;
  active: boolean;
  createdAt: Date;
}

const AlertSchema = new Schema<IAlert>({
  title: { type: String, required: true },
  severity: { type: String, enum: ['Extreme', 'High', 'Moderate', 'Info'], required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true, index: true },
  startTime: { type: Date, default: Date.now },
  expectedDuration: { type: String, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const Alert = mongoose.model<IAlert>('Alert', AlertSchema);
