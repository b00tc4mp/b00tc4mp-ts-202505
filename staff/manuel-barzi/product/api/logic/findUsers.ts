import { FindUsers } from "./types.js";
import { validate } from "./validate.js";
import { NotFoundError } from "./errors.js";
import { UserRepository } from "../data/repository/fs/UserRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
// import { UserRepository } from "../data/repository/sql/UserRepository.js";
import { IUserDoc } from "../data/repository/no-sql/types.js";

export const findUsers: FindUsers = (userId, query, sortField, sortOrder, pageNumber, pageSize) => {
    validate.id(userId, "user id")
    // TODO add validations for remaining parameters

    // return UserRepository.findBy(userId)

    /*
    return UserRepository.filter({ name: query, username: query, email: query }, { [sortField]: sortOder === "asc"? 0 : 1 }, { page: pageNumber, size: pageSize })
    */


    return Promise.resolve([])
};