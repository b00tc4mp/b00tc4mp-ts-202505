import { User } from "../data/models.js";
import validate from "./validate.js";
import { NotFoundError } from "./errors.js";
export const getUserInfo = (userId) => {
    validate.id(userId, "user id");
    return User.findById(userId)
        .lean()
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