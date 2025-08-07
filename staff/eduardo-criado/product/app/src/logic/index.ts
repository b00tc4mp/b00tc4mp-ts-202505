import getUserInfo from "./getUserInfo.ts";
import loginUser from "./loginUser.ts";
import logoutUser from "./logoutUser.ts";
import registerUser from "./registerUser.ts";
import searchUsers from "./seachUsers.ts";

const logic = {
  loginUser,
  registerUser,
  logoutUser,
  getUserInfo,
  searchUsers,
};

export default logic;
