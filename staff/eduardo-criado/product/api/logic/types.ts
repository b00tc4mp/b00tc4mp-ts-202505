import { IUserDoc } from "../data/repository/no-sql/types.js";

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   username: string;
//   password: string;
//   avatar?: string;
// }

export type RegisterUser = (
  name: string,
  email: string,
  username: string,
  password: string,
  avatar?: string
) => Promise<void>;

export type AuthenticateUser = (
  username: string,
  password: string
) => Promise<string>;

export type GetUserInfo = (id: string) => Promise<IUserDoc>;
// export type GetUserInfo = (id: string) => Promise<User>;

export type CreatePost = (
  author: string,
  title: string,
  description: string,
  image: string
) => Promise<void>;

export type Logic = {
  registerUser: RegisterUser;
  authenticateUser: AuthenticateUser;
  getUserInfo: GetUserInfo;
  createPost: CreatePost;
};
