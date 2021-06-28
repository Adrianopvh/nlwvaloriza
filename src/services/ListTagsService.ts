import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer";

class ListTagsService {
 async execute() {
  const tegsRepository = getCustomRepository(TagsRepositories);

  const tags = await tegsRepository.find();

   return classToPlain(tags);
 }
}

export { ListTagsService }