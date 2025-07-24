import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import { Response } from "express";

export const generateToken = (res: Response, user: IUserDocument) => {
    const token = jwt.sign({ userId: user._id }, "asdffhgjdfkdadadfjdask", { expiresIn: '1d' });
    res.cookie("token", token, { httpOnly: true, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 });
    return token;
};