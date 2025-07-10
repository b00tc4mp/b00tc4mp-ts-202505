import { User } from "../data/models.js";
import { NotFoundError, PasswordError, SystemError } from "./errors.js";
export const authenticateUser = (username, password) => {
    return User.findOne({ username }).lean()
        .catch(error => { new SystemError(error.message); })
        .then(user => {
        if (!user)
            throw new NotFoundError("user not found");
        if (user.password !== password)
            throw new PasswordError("wrong password");
        return user._id.toString();
    });
};
//# sourceMappingURL=authenticateUser.js.map