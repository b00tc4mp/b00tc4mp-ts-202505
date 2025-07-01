// import { RegisterUser } from "./types.js";
// // import { UserRepository } from "../data/repository/fs/UserRepository.js";
// // import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
// import { UserRepository } from "../data/repository/sql/UserRepository.js";
// import { DuplicityError, SystemError } from "./errors.js";
// import { validate } from "./validate.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { DuplicityError, SystemError } from "./errors.js";
import { validate } from "./validate.js";
export const registerUser = (name, email, username, password) => {
    validate.text(name, "name", 1, 100);
    validate.email(email, "email", 100);
    validate.text(username, "username", 3, 30);
    validate.text(password, "password", 8, 100);
    // const id = UserRepository.generateId();
    return UserRepository.save({
        id: UserRepository.generateId(),
        name,
        email,
        username,
        password,
    })
        .catch((error) => {
        if (error.code === 11000 ||
            error.message === "user data exists" ||
            error.code === "P2002")
            throw new DuplicityError("user already exists");
        throw new SystemError(error.message);
    })
        .then(() => { });
};
//# sourceMappingURL=registerUser.js.map