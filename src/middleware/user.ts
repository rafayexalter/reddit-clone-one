import User from "./../entities/User";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    // Verifying that it contains encrypted username
    const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findOne({ username });

    res.locals.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: error.message });
  }
};
