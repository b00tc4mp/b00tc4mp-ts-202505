import { Logic } from "./types.js";

import { registerUser } from "./registerUser.js";
import { authenticateUser } from "./authenticateUser.js";

export const logic: Logic = {
  registerUser,
  authenticateUser,
};
