import { Request, Response } from "express";
import { authService } from "./auth.service";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  if ("error" in result) return res.status(400).json(result);

  return res.json(result);
}
