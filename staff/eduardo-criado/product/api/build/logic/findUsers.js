import { validate } from "./validate.js";
import { NotFoundError, SystemError } from "./errors.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
export const findUsers = (userId, query, sortField, sortOrder, pageNumber, pageSize) => {
    validate.id(userId, "user id");
    return UserRepository.findById(userId)
        .catch((error) => {
        throw new SystemError(error.message);
    })
        .then((user) => {
        if (!user)
            throw new NotFoundError("user not found");
        return (UserRepository.filter({ name: query, username: query, email: query }, { [sortField]: sortOrder === "asc" ? 1 : -1 }, { page: pageNumber, size: pageSize })
            // return UserRepository.filter(
            //   {
            //     // OR: [{ name: query }, { username: query }, { email: query }],
            //     OR: [
            //       { name: { contains: query } },
            //       { username: { contains: query } },
            //       { email: { contains: query } },
            //     ],
            //   },
            //   { [sortField]: sortOrder === "asc" ? 1 : -1 },
            //   { page: pageNumber, size: pageSize }
            // )
            .catch((error) => {
            throw new SystemError(error.message);
        })
            .then((users) => {
            return users.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    avatar: user.avatar,
                };
            });
        }));
    });
};
//# sourceMappingURL=findUsers.js.map