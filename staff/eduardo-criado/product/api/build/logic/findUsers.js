import { validate } from "./validate.js";
import { NotFoundError, ValidationError } from "./errors.js";
import { UserRepository } from "../data/repository/fs/UserRepository.js";
export const findUsers = (userId, query, sortField, sortOrder, pageNumber, pageSize) => {
    if (userId === null || userId === undefined) {
        throw new ValidationError("invalid user id type");
    }
    if (userId !== undefined && userId !== null) {
        validate.id(userId, "user id");
        return UserRepository.findById(userId).then((user) => {
            if (!user)
                throw new NotFoundError("user not found");
            return [user];
        });
    }
    return UserRepository.filter({ name: query, username: query, email: query }, { [sortField]: sortOrder === "asc" ? 1 : -1 }, { page: pageNumber, size: pageSize }).then((users) => {
        return users;
    });
};
//# sourceMappingURL=findUsers.js.map