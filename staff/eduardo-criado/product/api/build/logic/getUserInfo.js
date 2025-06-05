import { User } from "../data/models.js";
import { NotFoundError } from "./errors.js";
export const getUserInfo = (id) => {
    return User.findById(id)
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