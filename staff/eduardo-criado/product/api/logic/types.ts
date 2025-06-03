import { User } from "../data/models.js";
import { IUserDoc } from "../data/types.js";

export type RegisterUser = (
  name: string,
  email: string,
  username: string,
  password: string
) => Promise<void>;

export type AuthenticateUser = (
  username: string,
  password: string
) => Promise<IUserDoc>;

export type Logic = {
  registerUser: RegisterUser;
  authenticateUser: AuthenticateUser;
};
