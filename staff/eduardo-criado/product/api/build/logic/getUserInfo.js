import { validate, NotFoundError, SystemError } from "com";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
export const getUserInfo = (userId) => {
    validate.id(userId, "user id");
    return UserRepository.findById(userId)
        .catch((error) => {
        throw new SystemError(error.message);
    })
        .then((user) => {
        if (!user)
            throw new NotFoundError("user not found");
        // return user as IUserDoc;
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            username: user.username,
        };
    });
};
//# sourceMappingURL=getUserInfo.js.map