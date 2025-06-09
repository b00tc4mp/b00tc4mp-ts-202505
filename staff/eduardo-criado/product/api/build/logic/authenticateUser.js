import { User } from "../data/models.js";
import { NotFoundError, PasswordError, SystemError } from "./errors.js";
import { validate } from "./validate.js";
export const authenticateUser = (username, password) => {
    validate.text(username, "username", 3, 30);
    validate.text(password, "password", 8, 100);
    return User.findOne({ username })
        .lean()
        .catch((error) => {
        new SystemError(error.message);
    })
        .then((user) => {
        if (!user)
            throw new NotFoundError("user not found");
        if (user.password !== password)
            throw new PasswordError("wrong password");
        return user._id.toString();
    });
};
//# sourceMappingURL=authenticateUser.js.map