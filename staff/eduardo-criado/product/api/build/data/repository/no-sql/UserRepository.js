import { SystemError } from "com";
import { User } from "./index.js";
import { Types } from "mongoose";
export const UserRepository = {
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
            .then(() => { });
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
            .then(() => { });
    },
    generateId() {
        return new Types.ObjectId().toString();
    },
    filter(criteria, sort, page) {
        const filterCriteria = {
            $or: Object.keys(criteria).map((key) => ({
                [key]: criteria[key],
            })),
        };
        return User.find(filterCriteria)
            .sort(sort)
            .skip((page.page - 1) * page.size)
            .limit(page.size)
            .lean()
            .catch((error) => {
            throw new SystemError(error.message);
        })
            .then((users) => {
            return users.map((user) => {
                return {
                    id: user._id.toString(),
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
/*
import { User } from "./index.js";
import { SystemError } from "../../../logic/errors.js";

filter(criteria, sort, page) {
  try {
    // Construcción de filtro dinámico seguro
    const query: any = {};
    if (criteria.name) query.name = criteria.name;
    if (criteria.username) query.username = criteria.username;
    if (criteria.email) query.email = criteria.email;

    // Orden dinámico seguro
    const sortKey = Object.keys(sort)[0] as "name" | "username" | "email";
    const sortOrder = sortKey ? { [sortKey]: sort[sortKey] } : {};

    // Paginación bien calculada
    const skip = (page.page - 1) * page.size;
    const limit = page.size;

    return User.find(query)
      .sort(sortOrder)
      .skip(skip)
      .limit(limit)
      .then((users) =>
        users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          password: user.password,
          avatar: user.avatar,
        }))
      );
  } catch (error) {
    throw new SystemError("Error filtering users: " + error.message);
  }
}
*/
//# sourceMappingURL=UserRepository.js.map