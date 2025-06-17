import { connect, disconnect } from "mongoose";
import { UserRepository } from "./UserRepository.js";
// import { IUserDoc } from "./types"

try {
  await connect("mongodb://localhost:27017/product-api");

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
    await UserRepository.save({
      id: UserRepository.generateId(),
      name: "EduFo",
      email: "edufo@gmail.com",
      avatar: "http://image.com/edufo",
      username: "eduFo",
      password: "123123123",
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
} catch (error) {
  console.error(error);
} finally {
  await disconnect();
}
