import { SystemError } from "../../../logic/errors.js";
import { IPostRepository, IPostData } from "../types.js";
import { Post } from "./index.js";
import { Types } from "mongoose";

export const PostRepository: IPostRepository = {
  save(post) {
    const post2 = {
      _id: new Types.ObjectId(post.id),
      author: post.author,
      title: post.title,
      description: post.description,
      image: post.image,
      createdAt: post.createdAt,
    };

    return Post.create(post2)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  },

  findById(id) {
    return Post.findById(id)
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((post) => {
        if (post)
          return {
            id: post.id,
            author: post.author.toString(),
            title: post.title,
            description: post.description,
            image: post.image,
            createdAt: post.createdAt,
          };

        return null;
      });
  },

  findAll() {
    return Post.find()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((posts) =>
        posts.map((post) => ({
          id: post.id,
          author: post.author.toString(),
          title: post.title,
          description: post.description,
          image: post.image,
          createdAt: post.createdAt,
        }))
      );
  },

  findByAuthor(authorId) {
    return Post.find({ author: authorId })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((posts) =>
        posts.map((post) => ({
          id: post.id,
          author: post.author.toString(),
          title: post.title,
          description: post.description,
          image: post.image,
          createdAt: post.createdAt,
        }))
      );
  },

  removeById(postId) {
    return Post.deleteOne({ _id: new Types.ObjectId(postId) })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  },

  removeAll() {
    return Post.deleteMany({})
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then(() => {});
  },

  generateId() {
    return new Types.ObjectId().toString();
  },
};
