import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { AppError } from "../shared/errors/AppError";

interface IAuthenticateRequest {
 email: string;
 password: string;
}

class AuthenticateUserService {

 async execute({ email, password }: IAuthenticateRequest) {
  const usersRepositories = getCustomRepository(UsersRepositories);

  const user = await usersRepositories.findOne({ email });

  if(!user) {
   throw new AppError("Email ou Password incorrect");
  }

  const passwordMatch = await compare(password, user.password);

  if(!passwordMatch) {
   throw new AppError("Email ou Password incorrect");
  }

  const token = sign({email: user.email},"6425ddbf9cd648e1e4d33c4340d3373d", {subject : user.id, expiresIn: "1d"});

  return token;

 }

}

export { AuthenticateUserService }