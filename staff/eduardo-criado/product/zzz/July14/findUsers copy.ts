import { FindUsers, User } from "./types.js";
import { validate } from "./validate.js";
import { NotFoundError } from "./errors.js";
import { UserRepository } from "../data/repository/fs/UserRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
// import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { IUserDoc } from "../data/repository/no-sql/types.js";

// export const findUsers: FindUsers = (userId) => {
//   validate.id(userId, "userId");
//   return UserRepository.findById(userId).then((user) => {
//     if (!user) throw new NotFoundError("user not found");
//     return [user];
//   });

//TODO redo findusers logic and test
export const findUsers: FindUsers = (
  userId,
  query,
  sortField,
  sortOrder,
  pageNumber,
  pageSize
) => {
  if (userId !== undefined && userId !== null) {
    validate.id(userId, "user id");
    return UserRepository.findById(userId).then((user) => {
      if (!user) throw new NotFoundError("user not found");
      return [user];
    });
  }

  // return UserRepository.findBy(userId)

  return UserRepository.filter(
    { name: query, username: query, email: query },
    { [sortField]: sortOrder === "asc" ? 0 : 1 },
    { page: pageNumber, size: pageSize }
  ).then((users) => {
    if (!users) throw new NotFoundError("users not found");
    return users;
  });
};

// return UserRepository.find(
//   query,
//   sortField,
//   sortOrder,
//   pageNumber,
//   pageSize
// ).then((users) => {
//   if (!users) throw new NotFoundError("users not found");
//   return users;
// });
