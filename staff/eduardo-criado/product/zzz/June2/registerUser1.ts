import { RegisterUser } from "./types.js";
import { User } from "../data/models.js";

export const registerUser: RegisterUser = (name, email, username, password) => {
  return User.create({ name, email, username, password })
    .catch((error) => {
      throw new Error(error.message);
    })
    .then((user) => {});
};
