import { IUserDoc } from "../data/repository/no-sql/types.js";

export type RegisterUser = (
  name: string,
  email: string,
  username: string,
  password: string
) => Promise<void>;

export type AuthenticateUser = (
  username: string,
  password: string
) => Promise<string>;

export type GetUserInfo = (id: string) => Promise<IUserDoc>;

export type Logic = {
  registerUser: RegisterUser;
  authenticateUser: AuthenticateUser;
  getUserInfo: GetUserInfo;
};
