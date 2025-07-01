// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
// import { PostRepository } from "../data/repository/no-sql/PostRepository.js";
import { UserRepository } from "../data/repository/fs/UserRepository.js";
import { PostRepository } from "../data/repository/fs/PostRepository.js";
import { NotFoundError, SystemError } from "./errors.js";
import { validate } from "./validate.js";
export const createPost = (authorId, title, description, image) => {
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
//# sourceMappingURL=createPost.js.map