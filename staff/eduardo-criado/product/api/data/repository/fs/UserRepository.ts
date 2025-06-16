// import { IUserRepository, IUserData } from "../types.js";
// import fs from "fs/promises";

// export const UserRepository: IUserRepository = {
//   save(user) {
//     return (
//       fs
//         .readFile("./data/repository/fs/users.json", "utf8")
//         // TODO manage system errors (catch)
//         .then((json) => {
//           const users: IUserData[] = JSON.parse(json);

//           users.push(user);

//           json = JSON.stringify(users);

//           return fs.writeFile("./data/repository/fs/users.json", json);
//           // TODO manage system errors (catch)
//         })
//     );
//   },

//   findByUsername(username) {
//     return fs
//       .readFile("./data/repository/fs/users.json", "utf8")
//       .then((json) => {
//         const users: IUserData[] = JSON.parse(json);

//         const user = users.find((user) => user.username === username);

//         if (!user) return null;

//         return user;
//       });
//   },

//   findById(id) {
//     return fs
//       .readFile("./data/repository/fs/users.json", "utf8")
//       .then((json) => {
//         const users: IUserData[] = JSON.parse(json);

//         const user = users.find((user) => user.id === id);

//         if (!user) return null;

//         return user;
//       });
//   },
// };

import { IUserRepository, IUserData } from "../types.js";
import fs from "fs/promises";

const { FS_USERS = "./data/repository/fs/users.json" } = process.env;

export const UserRepository: IUserRepository = {
  save(user) {
    return (
      fs
        .readFile(FS_USERS, "utf8")
        // TODO manage system errors (catch)
        .then((json) => {
          const users: IUserData[] = JSON.parse(json);

          const exists = users.some(
            (_user) =>
              _user.email === user.email || _user.username === user.username
          );

          if (exists) throw new Error("user data exists");

          users.push(user);

          json = JSON.stringify(users);

          return fs.writeFile(FS_USERS, json);
          // TODO manage system errors (catch)
        })
    );
  },

  findByUsername(username) {
    // TODO implement me

    return (
      fs
        .readFile(FS_USERS, "utf8")
        // TODO manage system errors (catch)
        .then((json) => {
          const users: IUserData[] = JSON.parse(json);

          const user = users.find((user) => user.username === username);

          if (user) return user;

          return null;
        })
    );
  },

  findById(id) {
    // TODO implement me

    return (
      fs
        .readFile(FS_USERS, "utf8")
        // TODO manage system errors (catch)
        .then((json) => {
          const users: IUserData[] = JSON.parse(json);

          const user = users.find((user) => user.id === id);

          if (user) return user;

          return null;
        })
    );
  },

  removeAll() {
    return fs.writeFile(FS_USERS, "[]");
  },

  generateId() {
    return Number(
      (Date.now() + Math.random()).toString().replace(".", "")
    ).toString(36);
  },
};
