import { IPostRepository, IPostData } from "../types.js";
import { SystemError } from "../../../logic/errors.js";

import fs from "fs/promises";

const { FS_POSTS = "./data/repository/fs/posts.json" } = process.env;

export const PostRepository: IPostRepository = {
  save(post) {
    return fs
      .readFile(FS_POSTS, "utf8")
      .catch((error) => {
        throw new SystemError("Error reading posts file: " + error.message);
      })
      .then((json) => {
        const posts: IPostData[] = JSON.parse(json);
        const exists = posts.some((_post) => _post.id === post.id);

        if (exists) throw new Error("post data exists");

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
        const posts: IPostData[] = JSON.parse(json);
        const post = posts.find((post) => post.id === id);

        if (post) return post;

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
        const posts: IPostData[] = JSON.parse(json);
        return posts;
      });
  },

  findByAuthor(author) {
    return fs
      .readFile(FS_POSTS, "utf8")
      .catch((error) => {
        throw new SystemError("Error reading posts file: " + error.message);
      })
      .then((json) => {
        const posts: IPostData[] = JSON.parse(json);
        const authorPosts = posts.filter((post) => post.author === author);
        return authorPosts;
      });
  },

  removeById(postId) {
    return fs
      .readFile(FS_POSTS, "utf8")
      .catch((error) => {
        throw new SystemError("Error reading posts file: " + error.message);
      })
      .then((json) => {
        let posts: IPostData[] = JSON.parse(json);
        posts = posts.filter((post) => post.id !== postId);
        json = JSON.stringify(posts);
        return fs.writeFile(FS_POSTS, json).catch((error) => {
          throw new SystemError("Error deleting post: " + error.message);
        });
      });
  },

  removeAll() {
    return fs.writeFile(FS_POSTS, "[]").catch((error) => {
      throw new SystemError("Error clearing posts file: " + error.message);
    });
  },

  generateId() {
    return Number(
      (Date.now() + Math.random()).toString().replace(".", "")
    ).toString(36);
  },
};
