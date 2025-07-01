import { Types } from "mongoose";

export interface IUserDoc {
  name: string;
  email: string;
  avatar?: string;
  username: string;
  password: string;
}

export interface IPostDoc {
  author: Types.ObjectId; // Assuming ObjectId type for MongoDB
  title: string;
  description: string;
  image: string;
  createdAt: Date;
}
