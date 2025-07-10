import { validate } from "./validate.js";
import { NotFoundError, SystemError } from "./errors.js";
// import { UserRepository } from "../data/repository/fs/UserRepository.js"
import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
// import { UserRepository } from "../data/repository/sql/UserRepository.js"
export const getUserInfo = userId => {
    validate.id(userId, "user id");
    return UserRepository.findById(userId)
        .catch(error => { throw new SystemError(error.message); })
        .then((user) => {
        if (!user)
            throw new NotFoundError("user not found");
        return user;
    });
};
//# sourceMappingURL=getUserInfo.js.map