import { IUserRepository, IUserData } from "../types.js"
import { prisma } from "./index.js"

export const UserRepository: IUserRepository = {
    save(user) {
        return prisma.user.create({ data: user })
            .then(() => { })
    },

    findByUsername(username) {
        return prisma.user.findFirst({ where: { username } })
    },

    findById(id) {
        return prisma.user.findFirst({ where: { id } })
    },

    removeAll() {
        return prisma.user.deleteMany()
            .then(() => { })
    },

    generateId() {
        return Number((Date.now() + Math.random()).toString().replace(".", "")).toString(36)
    }
}