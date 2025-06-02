import { User } from "../data/models.js";
import { DuplicityError, SystemError } from "./errors.js";
export const registerUser = (name, email, username, password) => {
    return User.create({ name, email, username, password })
        .catch(error => {
        if (error.code === 11000)
            throw new DuplicityError("user already exists");
        throw new SystemError(error.message);
    })
        .then(() => { });
};
//# sourceMappingURL=registerUser.js.map