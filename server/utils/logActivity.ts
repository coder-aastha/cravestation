// // utils/logActivity.ts
// import logger from "./logger";
// import { Request } from "express";

// export const logActivity = ({
//   req,
//   action,
//   userId,
//   email,
// }: {
//   req: Request;
//   action: string;
//   userId?: string;
//   email?: string;
// }) => {
//   const ip = req.ip;
//   const userAgent = req.headers["user-agent"] || "unknown";

//   const message = `Action: ${action}, UserID: ${userId || "N/A"}, Email: ${email || "N/A"}, IP: ${ip}, Agent: ${userAgent}`;
//   logger.info(message);
// };
