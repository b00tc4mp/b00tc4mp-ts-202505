import { SystemError } from "../../../logic/errors.js";
import { prisma } from "./index.js";
export const UserRepository = {
    save(user) {
        return prisma.user
            .create({
            data: user,
        })
            .catch((error) => {
            if (error.code === "P2002")
                throw error;
            throw new SystemError(error.message);
        })
            .then(() => { });
    },
    findByUsername(username) {
        return prisma.user
            .findFirst({
            where: {
                username,
            },
        })
            .catch((error) => {
            throw new SystemError(error.message);
        });
    },
    findById(id) {
        return prisma.user
            .findFirst({
            where: {
                id,
            },
        })
            .catch((error) => {
            throw new SystemError(error.message);
        });
    },
    removeAll() {
        return prisma.user
            .deleteMany()
            .catch((error) => {
            throw new SystemError(error.message);
        })
            .then(() => { });
    },
    generateId() {
        return Number((Date.now() + Math.random()).toString().replace(".", "")).toString(36);
    },
    filter() {
        return prisma.user.findMany().catch((error) => {
            throw new SystemError(error.message);
        });
    },
};
//# sourceMappingURL=UserRepository.js.map