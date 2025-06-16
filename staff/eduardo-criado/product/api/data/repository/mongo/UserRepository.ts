import { IUserRepository, IUserData } from "../types.js";
import { User, ObjectId } from "./index.js";

export const UserRepository: IUserRepository = {
  save(user) {
    const user2 = {
      _id: new ObjectId(user.id),
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      avatar: user.avatar,
    };

    return (
      User.create(user2)
        // TODO manage system errors (catch)
        .then(() => {})
    );
  },

  findByUsername(username) {
    return (
      User.findOne({ username })
        // TODO manage system errors (catch)
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
        })
    );
  },

  findById(id) {
    return (
      User.findById(id)
        // TODO manage system errors (catch)
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
        })
    );
  },

  removeAll() {
    // TODO implement me

    return (
      User.deleteMany()
        // TODO manage system errors (catch)
        .then(() => {})
    );
  },

  generateId() {
    return new ObjectId().toString();
  },
};
