import { FindUsers, User } from "./types.js";
import { validate } from "./validate.js";
import { NotFoundError } from "./errors.js";
// import { UserRepository } from "../data/repository/fs/UserRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
// import { IUserDoc } from "../data/repository/no-sql/types.js";

// export const findUsers: FindUsers = (userId) => {
//   validate.id(userId, "userId");
//   return UserRepository.findById(userId).then((user) => {
//     if (!user) throw new NotFoundError("user not found");
//     return [user];
//   });

export const findUsers = (id: string): Promise<User> => {
  validate.id(id, "user id");
  return UserRepository.findById(id).then((user) => {
    if (!user) throw new NotFoundError("user not found");
    return user;
  });
};
