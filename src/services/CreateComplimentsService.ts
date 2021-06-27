import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { AppError } from "../shared/errors/AppError";


interface ICompliments {
 tag_id: string;
 user_sender: string;
 user_receiver: string;
 message: string;

}

class CreateComplimentsService {

 async execute({ tag_id, user_sender, user_receiver, message }: ICompliments) {
  const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
  const usersRepository = getCustomRepository(UsersRepositories);

  if (user_sender === user_receiver) {
   throw new AppError("Incorrect User Receiver!")
  }

  const userReceiverExists = await usersRepository.findOne(user_receiver);

  if (!userReceiverExists) {
   throw new AppError("User Receiver does not exists!");
  }

  const compliment = complimentsRepositories.create({ tag_id, user_sender, user_receiver, message });

  await complimentsRepositories.save(compliment);

  return compliment;
 }
}

export { CreateComplimentsService }