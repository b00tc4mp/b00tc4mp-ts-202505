import { ObjectId, Schema, model } from "mongoose";

type UserDocType = {
  _id: ObjectId;
  name: string;
  email: string;
  avatar: string;
  username: string;
  password: string;
};

export const user = new Schema<UserDocType>({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = model<UserDocType>("User", user);

User.create();
