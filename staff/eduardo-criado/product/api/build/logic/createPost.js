import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { PostRepository } from "../data/repository/sql/PostRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
// import { PostRepository } from "../data/repository/no-sql/PostRepository.js";
import { validate, NotFoundError, SystemError } from "com";
export const createPost = (userId, title, description, image) => {
    validate.id(userId, "user id");
    validate.text(title, "title", 1, 100);
    validate.text(description, "description", 1, 500);
    validate.text(image, "image", 1, 500);
    const id = PostRepository.generateId();
    return UserRepository.findById(userId)
        .catch((error) => {
        throw new SystemError(error.message);
    })
        .then((user) => {
        if (!user) {
            throw new NotFoundError("user does not exist");
        }
        return PostRepository.save({
            id,
            author: userId,
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