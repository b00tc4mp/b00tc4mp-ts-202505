import { Schema, model } from "mongoose";
import { IUserDoc } from "./types.js";

export const user = new Schema<IUserDoc>({
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
    // required: true,
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

// const User = model<IUserDoc>("User", user);
export const User = model("User", user);

// User.create({
//   name: "Edu",
//   email: "edu@example.com",
//   avatar: "https://robohash.org/1",
//   username: "edu",
//   password: "123456",
// });

// User.findOne();

// export default User;
