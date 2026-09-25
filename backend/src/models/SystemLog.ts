import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemLog extends Document {
  level: 'info' | 'warn' | 'error';
  message: string;
  path?: string;
  method?: string;
  statusCode?: number;
  meta?: any;
  timestamp: Date;
}

const SystemLogSchema = new Schema<ISystemLog>({
  level: { type: String, enum: ['info', 'warn', 'error'], required: true },
  message: { type: String, required: true },
  path: { type: String },
  method: { type: String },
  statusCode: { type: Number },
  meta: { type: Schema.Types.Mixed },
  timestamp: { type: Date, default: Date.now }
});

export const SystemLog = mongoose.model<ISystemLog>('SystemLog', SystemLogSchema);
