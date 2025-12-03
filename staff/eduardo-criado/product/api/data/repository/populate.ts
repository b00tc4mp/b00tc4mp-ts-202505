import { connect, disconnect } from "mongoose";
import { UserRepository } from "./fs/UserRepository.js";
// import { UserRepository } from "./mongo/UserRepository.js";

try {
  await connect("mongodb://localhost:27017/product-api");

  try {
    await UserRepository.save({
      id: UserRepository.generateId(),
      name: "EduMar",
      email: "edumar@gmail.com",
      avatar: "http://image.com/edumar",
      username: "eduMar",
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
