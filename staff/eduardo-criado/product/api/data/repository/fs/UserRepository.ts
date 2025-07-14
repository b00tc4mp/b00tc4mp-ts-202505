import { IUserRepository, IUserData } from "../types.js";
import fs from "fs/promises";
import { SystemError } from "../../../logic/errors.js";

const { FS_USERS = "./data/repository/fs/users.json" } = process.env;

export const UserRepository: IUserRepository = {
  save(user) {
    return fs
      .readFile(FS_USERS, "utf8")
      .then((json) => {
        console.log("FS_USERS contents:", json);
        try {
          const users = JSON.parse(json);
          const exists = users.some(
            (_user: IUserData) =>
              _user.email === user.email || _user.username === user.username
          );

          if (exists) throw new Error("user data exists");

          users.push(user);

          json = JSON.stringify(users);
          return fs.writeFile(FS_USERS, json).catch((error) => {
            throw new SystemError("Error writing users file: " + error.message);
          });
        } catch (error) {
          console.error("Error parsing FS_USERS:", error);
          throw error;
        }
      })
      .catch((error) => {
        throw new SystemError("Error reading users file: " + error.message);
      });
  },

  // save(user) {
  //   return fs
  //     .readFile(FS_USERS, "utf8")
  //     .catch((error) => {
  //       throw new SystemError("Error reading users file: " + error.message);
  //     })
  //     .then((json) => {
  //       console.log("Contenido JSON:", json);

  //       const users: IUserData[] = JSON.parse(json);

  //       const exists = users.some(
  //         (_user) =>
  //           _user.email === user.email || _user.username === user.username
  //         // || _user.name === user.name
  //       );

  //       if (exists) throw new Error("user data exists");

  //       users.push(user);

  //       json = JSON.stringify(users);
  //       return fs.writeFile(FS_USERS, json).catch((error) => {
  //         throw new SystemError("Error writing users file: " + error.message);
  //       });
  //     });
  // },

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

  filter(criteria, sort, page) {
    return fs
      .readFile(FS_USERS, "utf8")
      .catch((error) => {
        throw new SystemError("Error reading users file: " + error.message);
      })
      .then((json) => {
        let users: IUserData[] = JSON.parse(json);

        users = users.filter((user) =>
          Object.entries(criteria).every(
            ([key, value]) => user[key as keyof IUserData] === value
          )
        );

        const key = Object.keys(sort)[0] as "name" | "username" | "email";
        if (key && sort[key] !== undefined) {
          users = users.sort((a, b) => {
            const aValue = a[key] ?? "";
            const bValue = b[key] ?? "";
            return sort[key] === 1
              ? aValue > bValue
                ? 1
                : -1
              : aValue < bValue
              ? 1
              : -1;
          });
        }

        // Paginate the users based on the page and size parameters
        const startIndex = (page.page - 1) * page.size;
        const endIndex = startIndex + page.size;
        users = users.slice(startIndex, endIndex);

        return users;
      });
  },
};
