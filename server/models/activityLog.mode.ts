// models/activityLog.model.ts
import { Schema, model, Document, Types } from "mongoose";

interface IActivityLog extends Document {
  user: Types.ObjectId;
  action: string;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

const activityLogSchema = new Schema<IActivityLog>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  ip: { type: String },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed },
});

export const ActivityLog = model<IActivityLog>("ActivityLog", activityLogSchema);
