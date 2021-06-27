import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/repositories";
import { AppError } from "../shared/errors/AppError";
import { hash } from "bcryptjs";

interface IUserRequest {
 name: string;
 email: string;
 admin?: boolean;
 password: string;
}

class CreateUserService {
 async execute({ name, email, admin, password }: IUserRequest) {
  const usersRepository = getCustomRepository(UsersRepositories);

  if (!email) {
   throw new AppError("Email incorrect");
  }

  const userAlreadyExists = await usersRepository.findOne({
   email,
  });

  if (userAlreadyExists) {
   throw new AppError("User already exists");
  }

  const passwordHash = await hash(password, 8)

  const user = usersRepository.create({
   name, 
   email, 
   admin, 
   password: passwordHash,
  });

  await usersRepository.save(user);

  return user;
 }
}

export { CreateUserService };