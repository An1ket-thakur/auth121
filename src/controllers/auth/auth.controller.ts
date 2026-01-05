import { Request, Response } from "express";
import { registerSchema } from "./auth.schema";

export async function registerHandler(req: Request, res: Response) {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid Data",
        errors: result.error.flatten(),
      });
    }
  } catch (error) {}
}
