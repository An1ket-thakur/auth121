import { Request, Response } from "express";
import { registerSchema } from "./auth.schema";
import { UserModel } from "../../models/user.model";

export async function registerHandler(req: Request, res: Response) {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Invalid Data",
        errors: result.error.flatten(),
      });
    }
    let { email, username, password } = result.data;
    const normalisedemail = String(email).toLowerCase().trim();
    const countEmail = await UserModel.count({ where: { email: normalisedemail } });
    if (countEmail) res.status(400).json({ message: "Email Already Exists" });
  } catch (error) {}
}
