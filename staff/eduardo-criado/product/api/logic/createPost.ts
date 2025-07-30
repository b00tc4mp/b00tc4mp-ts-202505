import { CreatePost } from "./types.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { PostRepository } from "../data/repository/sql/PostRepository.js";
import { NotFoundError, SystemError, ValidationError } from "./errors.js";
import { validate } from "./validate.js";
import { User } from "../data/repository/no-sql/index.js";

export const createPost: CreatePost = (
  authorId: string,
  title: string,
  description: string,
  image: string
) => {
  validate.id(authorId, "author id");
  validate.text(title, "title", 1, 100);
  validate.text(description, "description", 1, 500);
  validate.text(image, "image", 1, 500);

  const id = PostRepository.generateId();

  return UserRepository.findById(authorId)
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("author does not exist");
      }
      return PostRepository.save({
        id,
        author: authorId,
        title,
        description,
        image,
        createdAt: new Date(),
      })
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then(() => {
          // No return value, resolves to void
        });
      // Return nothing as per the original logic
    });
};
