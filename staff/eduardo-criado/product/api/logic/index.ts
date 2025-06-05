import { Logic } from "./types.js";

import { registerUser } from "./registerUser.js";
import { authenticateUser } from "./authenticateUser.js";
import { getUserInfo } from "./getUserInfo.js";

export const logic: Logic = {
  registerUser,
  authenticateUser,
  getUserInfo,
};
