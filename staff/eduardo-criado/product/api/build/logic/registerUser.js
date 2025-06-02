import { User } from "../data/models.js";
export const registerUser = (name, email, username, password) => {
    return User.create({ name, email, username, password })
        .catch((error) => {
        new Error(error.message);
    })
        .then((user) => { });
};
