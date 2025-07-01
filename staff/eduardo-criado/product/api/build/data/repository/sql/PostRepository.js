import { SystemError } from "../../../logic/errors.js";
import { prisma } from "./index.js";
export const PostRepository = {
    save(post) {
        return prisma.post
            .create({
            data: {
                id: post.id,
                authorId: post.author,
                title: post.title,
                description: post.description,
                image: post.image,
                createdAt: post.createdAt,
            },
        })
            .catch((error) => {
            throw new SystemError(error.message);
        })
            .then(() => { });
    },
    findAll() {
        return prisma.post
            .findMany()
            .catch((error) => {
            throw new SystemError(error.message);
        })
            .then((posts) => posts.map((post) => ({
            id: post.id,
            author: post.authorId,
            title: post.title,
            description: post.description,
            image: post.image,
            createdAt: post.createdAt,
        })));
    },
    findByAuthor(authorId) {
        return Promise.resolve([]);
    },
    //     return prisma.post
    //       .findMany({
    //         where: {
    //           authorId: authorId,
    //         },
    //       })
    //       .catch((error) => {
    //         throw new SystemError(error.message);
    //       })
    //       .then((posts) =>
    //         posts.map((post) => ({
    //           id: post.id,
    //           author: post.authorId,
    //           title: post.title,
    //           description: post.description,
    //           image: post.image,
    //           createdAt: post.createdAt,
    //         }))
    //       );
    //   },
    findById(id) {
        return prisma.post
            .findUnique({
            where: {
                id: id,
            },
        })
            .catch((error) => {
            throw new SystemError(error.message);
        })
            .then((post) => {
            if (post)
                return {
                    id: post.id,
                    author: post.authorId,
                    title: post.title,
                    description: post.description,
                    image: post.image,
                    createdAt: post.createdAt,
                };
            return null;
        });
    },
    removeAll() {
        return prisma.post
            .deleteMany()
            .catch((error) => {
            throw new SystemError(error.message);
        })
            .then(() => { });
    },
    remove(postId) {
        return prisma.post
            .delete({
            where: {
                id: postId,
            },
        })
            .catch((error) => {
            throw new SystemError(error.message);
        })
            .then(() => { });
    },
    generateId() {
        return Number((Date.now() + Math.random()).toString().replace(".", "")).toString(36);
    },
};
//# sourceMappingURL=PostRepository.js.map