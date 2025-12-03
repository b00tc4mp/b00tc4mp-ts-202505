import { Schema, model } from "mongoose";
import { IUserDoc } from "./types.js";

export const user = new Schema<IUserDoc>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 100,
  },

  avatar: {
    type: String,
    // required: false,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
  },
});

// const User = model<IUserDoc>("User", user);
export const User = model("User", user);
