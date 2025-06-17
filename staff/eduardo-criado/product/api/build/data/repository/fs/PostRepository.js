import { SystemError } from "../../../logic/errors.js";
import fs from "fs/promises";
const { FS_POSTS = "./data/repository/fs/posts.json" } = process.env;
export const PostRepository = {
    save(post) {
        return fs
            .readFile(FS_POSTS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading posts file: " + error.message);
        })
            .then((json) => {
            const posts = JSON.parse(json);
            const exists = posts.some((_post) => _post.id === post.id);
            if (exists)
                throw new Error("post data exists");
            posts.push(post);
            json = JSON.stringify(posts);
            return fs.writeFile(FS_POSTS, json).catch((error) => {
                throw new SystemError("Error writing posts file: " + error.message);
            });
        });
    },
    findById(id) {
        return fs
            .readFile(FS_POSTS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading posts file: " + error.message);
        })
            .then((json) => {
            const posts = JSON.parse(json);
            const post = posts.find((post) => post.id === id);
            if (post)
                return post;
            return null;
        });
    },
    findAll() {
        return fs
            .readFile(FS_POSTS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading posts file: " + error.message);
        })
            .then((json) => {
            const posts = JSON.parse(json);
            return posts;
        });
    },
    findByUser(userId) {
        return fs
            .readFile(FS_POSTS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading posts file: " + error.message);
        })
            .then((json) => {
            const posts = JSON.parse(json);
            const userPosts = posts.filter((post) => post.userId === userId);
            return userPosts;
        });
    },
    remove(postId) {
        return fs
            .readFile(FS_POSTS, "utf8")
            .catch((error) => {
            throw new SystemError("Error reading posts file: " + error.message);
        })
            .then((json) => {
            let posts = JSON.parse(json);
            posts = posts.filter((post) => post.id !== postId);
            json = JSON.stringify(posts);
            return fs.writeFile(FS_POSTS, json).catch((error) => {
                throw new SystemError("Error deleting post: " + error.message);
            });
        });
    },
    generateId() {
        return Number((Date.now() + Math.random()).toString().replace(".", "")).toString(36);
    },
};
//# sourceMappingURL=PostRepository.js.map