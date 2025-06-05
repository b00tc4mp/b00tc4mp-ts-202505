import { GetUserInfo } from "./types.js";
import { User } from "../data/models.js";
import { NotFoundError } from "./errors.js";

export const getUserInfo: GetUserInfo = (id) => {
  return User.findById(id)
    .lean()
    .catch((error) => {
      throw new NotFoundError("user not found");
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");
      return user;
    });
};
