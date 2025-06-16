import { validate } from "./validate.js";
import { NotFoundError } from "./errors.js";
import { UserRepository } from "../data/repository/fs/UserRepository.js";
export const getUserInfo = (userId) => {
    validate.id(userId, "user id");
    return UserRepository.findById(userId)
        .catch((error) => {
        throw new NotFoundError("user not found");
    })
        .then((user) => {
        if (!user)
            throw new NotFoundError("user not found");
        return user;
    });
};
//# sourceMappingURL=getUserInfo.js.map