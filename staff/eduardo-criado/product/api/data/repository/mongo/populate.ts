import { connect, disconnect } from "mongoose";
import { User } from "./index.js";
// import { IUserDoc } from "./types"

try {
  await connect("mongodb://localhost:27017/product-edu");

  // try {
  //     await User.deleteMany()
  // } catch (error) {
  //     throw new Error(error.message)
  // }

  // try {
  //     await User.create({ name: "Edu", email: "edu@mail.com", avatar: "http://image.com/edu", username: "edu", password: "123123123" })
  // } catch (error) {
  //     throw new Error(error.message)
  // }

  // try {
  //     const user = new User({ name: "Edu", email: "edu@mail.com", avatar: "http://image.com/edu", username: "edu", password: "123123123" })

  //     await user.save()
  // } catch (error) {
  //     throw new Error(error.message)
  // }

  let user;

  try {
    user = await User.findById("68360519eadd29752ce2b85b").lean();
  } catch (error) {
    throw new Error((error as Error).message);
  }

  if (!user) throw new Error("user not found");

  console.log(user.name);
} catch (error) {
  console.error(error);
} finally {
  await disconnect();
}
