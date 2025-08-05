import { FindUsers, User } from "./types.js";
import { validate, NotFoundError, SystemError, ValidationError } from "com";
import { UserRepository } from "../data/repository/sql/UserRepository.js";

export const findUsers: FindUsers = (
  userId,
  query,
  sortField,
  sortOrder,
  pageNumber,
  pageSize
) => {
  validate.id(userId, "user id");
  validate.text(query, "query", 1, 100);
  validate.text(sortField, "sort field", 1, 100);
  validate.text(sortOrder, "sort order", 1, 100);
  validate.number(pageNumber, "page number");
  validate.number(pageSize, "page size");

  return UserRepository.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      return (
        UserRepository.filter(
          { name: query, username: query, email: query },
          { [sortField]: sortOrder === "asc" ? 1 : -1 },
          { page: pageNumber, size: pageSize }
        )
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
                avatar: user.avatar,
              } as User;
            });
          })
      );
    });
};
