// utils/activityLogger.ts
import { Request } from "express";
import { ActivityLog } from "../models/activityLog.model";


export async function logActivity(req: Request, userId: string, action: string, metadata?: Record<string, any>) {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"] || "unknown";

    await ActivityLog.create({
      user: userId,
      action,
      ip,
      userAgent,
      metadata,
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
