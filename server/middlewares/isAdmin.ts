// // middlewares/isAdmin.ts
// import { Request, Response, NextFunction } from "express";
// import { User } from "../models/user.model";

// export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const userId = req.id;
//     const user = await User.findById(userId);

//     if (!user || !user.admin) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Admins only.",
//       });
//     }

//     next();
//   } catch (error) {
//     console.error("Admin check failed:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
