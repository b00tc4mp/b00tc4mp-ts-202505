import { UserRepository } from "../data/repository/sql/UserRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
import { validate, NotFoundError, CredentialsError, SystemError } from "com";
export const authenticateUser = (username, password) => {
    validate.text(username, "username", 3, 30);
    validate.text(password, "password", 8, 100);
    return UserRepository.findByUsername(username)
        .catch((error) => {
        new SystemError(error.message);
    })
        .then((user) => {
        if (!user)
            throw new NotFoundError("user not found");
        if (user.password !== password)
            throw new CredentialsError("wrong password");
        return user.id;
    });
};
//# sourceMappingURL=authenticateUser.js.map