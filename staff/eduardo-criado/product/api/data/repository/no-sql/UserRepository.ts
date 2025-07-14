import { SystemError } from "../../../logic/errors.js";
import { IUserRepository, IUserData } from "../types.js";
import { User } from "./index.js";
import { Types } from "mongoose";

export const UserRepository: IUserRepository = {
  save(user) {
    const user2 = {
      _id: new Types.ObjectId(user.id),
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      avatar: user.avatar,
    };

    return User.create(user2)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  },

  findByUsername(username) {
    return User.findOne({ username })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((user) => {
        if (user)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            password: user.password,
            avatar: user.avatar,
          };

        return null;
      });
  },

  findById(userId) {
    return User.findById(userId)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((user) => {
        if (user)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            password: user.password,
            avatar: user.avatar,
          };

        return null;
      });
  },

  removeAll() {
    return User.deleteMany()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  },

  generateId() {
    return new Types.ObjectId().toString();
  },

  filter(
    criteria: { name?: string; username?: string; email?: string },
    sort: { [key in "name" | "username" | "email"]?: number },
    page: { page: number; size: number }
  ) {
    return UserRepository.filter(
      {
        name: criteria.name,
        username: criteria.username,
        email: criteria.email,
      },
      sort,
      page
    )

      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((users: IUserData[]) => {
        return users.map((user) => {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            password: user.password,
            avatar: user.avatar,
          };
        });
      });
  },
};
