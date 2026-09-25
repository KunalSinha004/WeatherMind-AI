import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedLocation extends Document {
  userId: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  isPrimary: boolean;
  createdAt: Date;
}

const SavedLocationSchema = new Schema<ISavedLocation>({
  userId: { type: String, required: true, index: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  isPrimary: { type: Boolean, default: false }
}, { timestamps: true });

export const SavedLocation = mongoose.model<ISavedLocation>('SavedLocation', SavedLocationSchema);
