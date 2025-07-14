// import { IUserDoc } from "../data/repository/no-sql/types.js";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string | null;
}

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

// export type GetUserInfo = (id: string) => Promise<IUserDoc>;
export type GetUserInfo = (userId: string) => Promise<User>;

export type CreatePost = (
  author: string,
  title: string,
  description: string,
  image: string
) => Promise<void>;

export type GenerateCaption = (
  userId: string,
  keywords: string[]
) => Promise<string>;

// export type FindUsers = (
//   query: string,
//   order: string,
//   page: number,
//   max: number
// ) => Promise<User>;

export type FindUsers = (
  userId: string,
  query: string,
  sortField: "name" | "email" | "username",
  sortOrder: "asc" | "desc",
  pageNumber: number,
  pageSize: number
) => Promise<User[]>;

export type Logic = {
  registerUser: RegisterUser;
  authenticateUser: AuthenticateUser;
  getUserInfo: GetUserInfo;
  createPost: CreatePost;
  generateCaption: GenerateCaption;
  findUsers: FindUsers;
};
