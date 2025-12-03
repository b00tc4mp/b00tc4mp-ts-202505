import { expect } from "chai";
import { UserRepository } from "./UserRepository.js";
import { IUserData } from "../types.js";
import fs from "fs/promises";

// const { FS_PATH } = process.env;

const { FS_PATH } = process.env;

describe("UserRepository (FS)", () => {
  beforeEach(() => fs.writeFile(`${FS_PATH}/users.json`, "[]"));

  describe("save", () => {
    it("saves a new user", () => {
      const user: IUserData = {
        id: "user-3",
        name: "Ed Z",
        email: "eduz@mail.com",
        username: "eduZ",
        password: "123123123",
      };

      return UserRepository.save(user)
        .then(() => fs.readFile(`${FS_PATH}/users.json`, "utf8"))
        .then((json) => JSON.parse(json))
        .then((users: IUserData[]) => {
          const user = users.find((user) => user.id === "user-3");
          if (!user) throw new Error("user not found");

          expect(user.id).to.equal("user-3");
          expect(user.name).to.equal("Ed Z");
          expect(user.email).to.equal("eduz@mail.com");
          expect(user.username).to.equal("eduZ");
          expect(user.password).to.equal("123123123");
        });
    });
  });

  describe("findByUsername", () => {
    it("finds a user by username", () => {
      const user: IUserData = {
        id: "user-1",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };

      const users = [user];

      const json = JSON.stringify(users);

      return fs
        .writeFile(`${FS_PATH}/users.json`, json)
        .then(() => UserRepository.findByUsername("edu"))
        .then((user: IUserData | null) => {
          expect(user).to.exist;
          expect(user!.name).to.equal("Ed U");
          expect(user!.email).to.equal("edu@mail.com");
          expect(user!.username).to.equal("edu");
          expect(user!.password).to.equal("123123123");
        });
    });
  });

  describe("findById", () => {
    it("finds a user by id", () => {
      const user: IUserData = {
        id: "user-1",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };

      const users = [user];

      const json = JSON.stringify(users);

      return fs
        .writeFile(`${FS_PATH}/users.json`, json)
        .then(() => UserRepository.findById("user-1"))
        .then((user: IUserData | null) => {
          expect(user).to.exist;
          expect(user!.name).to.equal("Ed U");
          expect(user!.email).to.equal("edu@mail.com");
          expect(user!.username).to.equal("edu");
          expect(user!.password).to.equal("123123123");
        });
    });
  });

  describe("removeAll", () => {
    it("removes all users", () => {
      const user: IUserData = {
        id: "user-1",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };
      const user2: IUserData = {
        id: "user-2",
        name: "Ed U 2",
        email: "edu2@mail.com",
        username: "edu2",
        password: "123123123",
      };
      const user3: IUserData = {
        id: "user-3",
        name: "Ed U 3",
        email: "edu3@mail.com",
        username: "edu3",
        password: "123123123",
      };

      const users = [user, user2, user3];

      const json = JSON.stringify(users);

      return fs
        .writeFile(`${FS_PATH}/users.json`, json)
        .then(() => UserRepository.removeAll())
        .then(() => fs.readFile(`${FS_PATH}/users.json`, "utf-8"))
        .then((json) => expect(json).to.equal("[]"));
    });
  });

  describe("generateId", () => {
    it("creates a new user id", () => {
      const id = UserRepository.generateId();

      expect(id).to.be.a.string;
    });
  });

  describe("filter by params", () => {
    it("filters users by params in descending order", () => {
      const user: IUserData = {
        id: "user-1",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };
      const user2: IUserData = {
        id: "user-2",
        name: "Ed U 2",
        email: "edu2@mail.com",
        username: "educo",
        password: "123123123",
      };
      const user3: IUserData = {
        id: "user-3",
        name: "Ed U 3",
        email: "edu3@mail.com",
        username: "educa",
        password: "123123123",
      };

      const users = [user, user2, user3];

      const json = JSON.stringify(users);

      return fs
        .writeFile(`${FS_PATH}/users.json`, json)
        .then(() =>
          UserRepository.filter(
            { username: "edu", name: "Ed U 3" },
            { username: 1 },
            { page: 1, size: 1 }
          )
        )
        .then((users: IUserData[]) => {
          expect(users.length).to.equal(1);
          expect(users[0].name).to.equal("Ed U");
          expect(users[0].id).to.equal("user-1");
          expect(users[0].email).to.equal("edu@mail.com");
          expect(users[0].username).to.equal("edu");
          expect(users[0].password).to.equal("123123123");
        });
    });

    it("filters users by params in descending order", () => {
      const user: IUserData = {
        id: "user-1",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };
      const user2: IUserData = {
        id: "user-2",
        name: "Ed U 2",
        email: "edu2@mail.com",
        username: "educo",
        password: "123123123",
      };
      const user3: IUserData = {
        id: "user-3",
        name: "Ed U 3",
        email: "edu3@mail.com",
        username: "educa",
        password: "123123123",
      };

      const users = [user, user2, user3];

      const json = JSON.stringify(users);

      return fs
        .writeFile(`${FS_PATH}/users.json`, json)
        .then(() =>
          UserRepository.filter(
            { username: "edu", name: "Ed U 3" },
            { username: -1 },
            { page: 1, size: 1 }
          )
        )
        .then((users: IUserData[]) => {
          expect(users.length).to.equal(1);
          expect(users[0].name).to.equal("Ed U 3");
          expect(users[0].id).to.equal("user-3");
          expect(users[0].email).to.equal("edu3@mail.com");
          expect(users[0].username).to.equal("educa");
          expect(users[0].password).to.equal("123123123");
        });
    });

    it("filters by empty username string", () => {
      const user: IUserData = {
        id: "user-1",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };
      const user2: IUserData = {
        id: "user-2",
        name: "Ed U 2",
        email: "edu2@mail.com",
        username: "educo",
        password: "123123123",
      };
      const user3: IUserData = {
        id: "user-3",
        name: "Ed U 3",
        email: "edu3@mail.com",
        username: "educa",
        password: "123123123",
      };

      const users = [user, user2, user3];

      const json = JSON.stringify(users);

      return fs
        .writeFile(`${FS_PATH}/users.json`, json)
        .then(() =>
          UserRepository.filter(
            { username: "" },
            { username: 1 },
            { page: 1, size: 0 }
          )
        )
        .then((users: IUserData[]) => {
          expect(users.length).to.equal(0);
        });
    });
  });

  afterEach(() => fs.writeFile(`${FS_PATH}/users.json`, "[]"));
});
