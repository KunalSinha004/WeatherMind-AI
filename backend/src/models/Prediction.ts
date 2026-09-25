import mongoose, { Schema, Document } from 'mongoose';

export interface IPrediction extends Document {
  location: string;
  metric: string;
  horizonDays: number;
  modelUsed: string;
  confidenceScore: number;
  historicalAvg: number;
  currentObservation: number;
  mae: number;
  rmse: number;
  r2: number;
  forecast: Array<{
    date: string;
    predictedValue: number;
    lowerBound: number;
    upperBound: number;
    confidence: number;
    unit: string;
  }>;
  requestedBy?: string;
  createdAt: Date;
}

const PredictionSchema = new Schema<IPrediction>({
  location: { type: String, required: true, index: true },
  metric: { type: String, required: true },
  horizonDays: { type: Number, required: true },
  modelUsed: { type: String, required: true },
  confidenceScore: { type: Number, required: true },
  historicalAvg: { type: Number, required: true },
  currentObservation: { type: Number, required: true },
  mae: { type: Number, required: true },
  rmse: { type: Number, required: true },
  r2: { type: Number, required: true },
  forecast: [{
    date: { type: String, required: true },
    predictedValue: { type: Number, required: true },
    lowerBound: { type: Number, required: true },
    upperBound: { type: Number, required: true },
    confidence: { type: Number, required: true },
    unit: { type: String, required: true }
  }],
  requestedBy: { type: String, default: 'anonymous' }
}, { timestamps: true });

export const Prediction = mongoose.model<IPrediction>('Prediction', PredictionSchema);
