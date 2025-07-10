import { AuthenticateUser } from "./types.js"
// import { UserRepository } from "../data/repository/mongo/UserRepository.js"
import { UserRepository } from "../data/repository/fs/UserRepository.js"
import { NotFoundError, PasswordError, SystemError } from "./errors.js"

export const authenticateUser: AuthenticateUser = (username, password) => {
    return UserRepository.findByUsername(username)
        .catch(error => { new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            if (user.password !== password) throw new PasswordError("wrong password")

            return user.id
        })
}