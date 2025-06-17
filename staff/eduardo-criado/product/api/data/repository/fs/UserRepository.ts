import { IUserRepository, IUserData } from "../types.js";
import fs from "fs/promises";
import { SystemError } from "../../../logic/errors.js";

const { FS_USERS = "./data/repository/fs/users.json" } = process.env;

export const UserRepository: IUserRepository = {
  save(user) {
    return fs
      .readFile(FS_USERS, "utf8")
      .catch((error) => {
        throw new SystemError("Error reading users file: " + error.message);
      })
      .then((json) => {
        const users: IUserData[] = JSON.parse(json);

        const exists = users.some(
          (_user) =>
            _user.email === user.email || _user.username === user.username
        );

        if (exists) throw new Error("user data exists");

        users.push(user);

        json = JSON.stringify(users);
        return fs.writeFile(FS_USERS, json).catch((error) => {
          throw new SystemError("Error writing users file: " + error.message);
        });
      });
  },

  findByUsername(username) {
    return fs
      .readFile(FS_USERS, "utf8")
      .catch((error) => {
        throw new SystemError("Error reading users file: " + error.message);
      })
      .then((json) => {
        const users: IUserData[] = JSON.parse(json);

        const user = users.find((user) => user.username === username);

        if (user) return user;

        return null;
      });
  },

  findById(id) {
    return fs
      .readFile(FS_USERS, "utf8")
      .catch((error) => {
        throw new SystemError("Error reading users file: " + error.message);
      })
      .then((json) => {
        const users: IUserData[] = JSON.parse(json);

        const user = users.find((user) => user.id === id);

        if (user) return user;

        return null;
      });
  },

  removeAll() {
    return fs.writeFile(FS_USERS, "[]").catch((error) => {
      throw new SystemError("Error clearing users file: " + error.message);
    });
  },

  generateId() {
    return Number(
      (Date.now() + Math.random()).toString().replace(".", "")
    ).toString(36);
  },
};
