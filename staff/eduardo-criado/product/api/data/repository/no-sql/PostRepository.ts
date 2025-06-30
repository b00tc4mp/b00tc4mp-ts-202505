import { SystemError } from "../../../logic/errors.js";
import { IPostRepository, IPostData } from "../types.js";
import { Post, ObjectId } from "./index.js";

export const PostRepository: IPostRepository = {
  save(post) {
    const post2 = {
      _id: new ObjectId(post.id),
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
            author: post.author,
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
          author: post.author,
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
          author: post.author,
          title: post.title,
          description: post.description,
          image: post.image,
          createdAt: post.createdAt,
        }))
      );
  },

  remove(postId) {
    return Post.deleteOne({ _id: new ObjectId(postId) })
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
    return new ObjectId().toString();
  },
};
