import { GetUserInfo, User } from "./types.js";
import { validate } from "./validate.js";
import { NotFoundError, SystemError } from "./errors.js";
// import { UserRepository } from "../data/repository/fs/UserRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { IUserDoc } from "../data/repository/no-sql/types.js";

export const getUserInfo: GetUserInfo = (userId) => {
  validate.id(userId, "user id");

  return UserRepository.findById(userId)
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");
      // return user as IUserDoc;
      return user as User;
    });
};
