import { IUserRepository, IUserData } from "../types.js";
import { SystemError } from "../../../logic/errors.js";
import { prisma } from "./index.js";

export const UserRepository: IUserRepository = {
  save(user) {
    return prisma.user
      .create({
        data: user,
      })
      .catch((error) => {
        if (error.code === "P2002") throw error;

        throw new SystemError(error.message);
      })
      .then(() => {});
  },

  findByUsername(username) {
    return prisma.user
      .findFirst({
        where: {
          username,
        },
      })
      .catch((error) => {
        throw new SystemError(error.message);
      });
  },

  findById(id) {
    return prisma.user
      .findFirst({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new SystemError(error.message);
      });
  },

  removeAll() {
    return prisma.user
      .deleteMany()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  },

  generateId() {
    return Number(
      (Date.now() + Math.random()).toString().replace(".", "")
    ).toString(36);
  },

  filter(criteria, sort, page) {
    return prisma.user
      .findMany({
        where: criteria,
        orderBy: {
          [Object.keys(sort)[0]]: Object.values(sort)[0] === 1 ? "asc" : "desc",
        },
        skip: (page.page - 1) * page.size,
        take: page.size,
      })
      .catch((error) => {
        throw new SystemError(error.message);
      });
  },
};

// filter(criteria, sort, page) {
//   // Convierte { email: 1 } a { email: "asc" }
//   const sortKey = Object.keys(sort)[0] as "name" | "email" | "username";
//   const sortValue = sort[sortKey];
//   const orderBy = { [sortKey]: sortValue === 1 ? "asc" : "desc" };

//   return prisma.user
//     .findMany({
//       where: criteria,
//       orderBy,
//       skip: (page.page - 1) * page.size,
//       take: page.size,
//     })
//     .catch((error) => {
//       throw new SystemError(error.message);
//     });
// },
// };
