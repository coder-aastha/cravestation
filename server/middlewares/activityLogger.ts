// // middleware/activityLogger.ts
// import { Request, Response, NextFunction } from 'express';
// import ActivityLog from '../models/ActivityLog';

// export const logActivity = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.id; // Changed from req.user?.id to req.id
//     if (!userId) {
//       return next(); // Skip if no user ID (e.g., unauthenticated request)
//     }

//     const { method, originalUrl } = req;
//     const action = method.toUpperCase(); // e.g., GET, POST, PUT, DELETE
//     const resource = originalUrl.split('/').filter(Boolean)[1] || 'Unknown'; // e.g., "users", "products"
//     const details = `Action performed on ${originalUrl}`;

//     await ActivityLog.create({
//       userId,
//       action,
//       resource,
//       details,
//     });

//     next();
//   } catch (error) {
//     console.error('Error logging activity:', error);
//     next();
//   }
// };