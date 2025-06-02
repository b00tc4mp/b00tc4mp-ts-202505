import { RegisterUser } from "./types.js"
import { User } from "../data/models.js"
import { DuplicityError, SystemError } from "./errors.js"

export const registerUser: RegisterUser = (name, email, username, password) => {
    return User.create({ name, email, username, password })
        .catch(error => {
            if (error.code === 11000) throw new DuplicityError("user already exists")

            throw new SystemError(error.message)
        })
        .then(() => { })
}