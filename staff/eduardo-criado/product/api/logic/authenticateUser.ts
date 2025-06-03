import { AuthenticateUser } from "./types.js";
import { User } from "../data/models.js";
import { SystemError, CredentialsError } from "./errors.js";

export const authenticateUser: AuthenticateUser = (username, password) => {
  return User.findOne({ username, password })
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new CredentialsError("invalid credentials");

      return user;
    });
};
