import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token not provided" });

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return next();
  } catch {
    return res.status(401).json({ error: "Token invalid" });
  }
}
