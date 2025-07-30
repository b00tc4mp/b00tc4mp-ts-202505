import { AuthenticateUser } from "./types.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { NotFoundError, PasswordError, SystemError } from "./errors.js";
import { validate } from "./validate.js";

export const authenticateUser: AuthenticateUser = (username, password) => {
  validate.text(username, "username", 3, 30);
  validate.text(password, "password", 8, 100);
  return UserRepository.findByUsername(username)

    .catch((error) => {
      new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError("user not found");

      if (user.password !== password) throw new PasswordError("wrong password");

      return user.id;
    });
};
