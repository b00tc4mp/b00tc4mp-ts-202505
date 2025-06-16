import { expect } from "chai";
import { UserRepository } from "./UserRepository.js";
import { IUserData } from "../types.js";
import fs from "fs/promises";

describe("UserRepository (FS)", () => {
  describe("save", () => {
    it("saves a new user", () => {
      const user: IUserData = {
        id: "user-1",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };

      return UserRepository.save(user)
        .then(() => fs.readFile("./data/repository/fs/users.json", "utf8"))
        .then((json) => JSON.parse(json))
        .then((users: IUserData[]) => {
          const user = users.find((user) => user.id === "user-1");

          if (!user) throw new Error("user not found");

          expect(user.id).to.equal("user-1");
          expect(user.name).to.equal("Ed U");
          expect(user.email).to.equal("edu@mail.com");
          expect(user.username).to.equal("edu");
          expect(user.password).to.equal("123123123");
        });
    });
  });

  describe("findByUsername", () => {
    it("finds a user by username", () => {
      return UserRepository.findByUsername("edu")
        .then(() => fs.readFile("./data/repository/fs/users.json", "utf8"))
        .then((json) => JSON.parse(json))
        .then((users: IUserData[]) => {
          const user = users.find((user) => user.username === "edu");

          if (!user) throw new Error("user not found");

          expect(user.id).to.equal("user-1");
          expect(user.name).to.equal("Ed U");
          expect(user.email).to.equal("edu@mail.com");
          expect(user.username).to.equal("edu");
          expect(user.password).to.equal("123123123");
          return user;
        });
    });
  });

  describe("findById", () => {
    it("finds a user by id", () => {
      return UserRepository.findById("user-1")
        .then(() => fs.readFile("./data/repository/fs/users.json", "utf8"))
        .then((json) => JSON.parse(json))
        .then((users: IUserData[]) => {
          const user = users.find((user) => user.id === "user-1");

          if (!user) throw new Error("user not found");

          expect(user.id).to.equal("user-1");
          expect(user.name).to.equal("Ed U");
          expect(user.email).to.equal("edu@mail.com");
          expect(user.username).to.equal("edu");
          expect(user.password).to.equal("123123123");
          return user;
        });
    });
  });
});
