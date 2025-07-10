import { validate } from "./validate.js";
export const findUsers = (userId, query, sortField, sortOrder, pageNumber, pageSize) => {
    validate.id(userId, "user id");
    // TODO add validations for remaining parameters
    // return UserRepository.findBy(userId)
    /*
    return UserRepository.filter({ name: query, username: query, email: query }, { [sortField]: sortOder === "asc"? 0 : 1 }, { page: pageNumber, size: pageSize })
    */
    return Promise.resolve([]);
};
//# sourceMappingURL=findUsers.js.map