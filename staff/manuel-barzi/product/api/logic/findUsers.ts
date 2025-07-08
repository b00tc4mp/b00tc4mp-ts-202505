import { FindUsers } from "./types.js";
import { validate } from "./validate.js";
import { NotFoundError } from "./errors.js";
// import { UserRepository } from "../data/repository/fs/UserRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { IUserDoc } from "../data/repository/no-sql/types.js";

export const findUsers: FindUsers = () => {
    return Promise.resolve([])
};