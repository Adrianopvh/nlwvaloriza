import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
 async handle(reqquest: Request, response: Response) {
  const { email, password } = reqquest.body;

  const authenticateUserService = new AuthenticateUserService();

  const token = await authenticateUserService.execute({ email, password });

  return response.json(token);
 }
}

export { AuthenticateUserController }
