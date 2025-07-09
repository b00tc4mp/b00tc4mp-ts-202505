import { expect } from "chai";
import { PostRepository } from "./PostRepository.js";
import { IPostData } from "../types.js";
import fs from "fs/promises";
import { afterEach } from "mocha";

const { FS_POSTS = "./data/repository/fs/posts-test.json" } = process.env;

describe("PostRepository (FS)", () => {
  beforeEach(() => fs.writeFile(FS_POSTS, "[]"));

  describe("save", () => {
    it("saves a new post", () => {
      const post: IPostData = {
        id: "post-3",
        author: "user-1",
        title: "Post Title",
        description: "Post Description",
        image: "image.jpg",
        createdAt: new Date(),
      };

      return PostRepository.save(post)
        .then(() => fs.readFile(FS_POSTS, "utf8"))
        .then((json) => JSON.parse(json))
        .then((posts: IPostData[]) => {
          const savedPost = posts.find((p) => p.id === "post-3");
          if (!savedPost) throw new Error("post not found");

          expect(savedPost.id).to.equal("post-3");
          expect(savedPost.author).to.equal("user-1");
          expect(savedPost.title).to.equal("Post Title");
          expect(savedPost.description).to.equal("Post Description");
          expect(savedPost.image).to.equal("image.jpg");
          expect(new Date(savedPost.createdAt)).to.be.instanceOf(Date);
        });
    });
  });

  describe("findById", () => {
    it("finds a post by id", () => {
      const post: IPostData = {
        id: "post-3",
        author: "user-1",
        title: "Post Title",
        description: "Post Description",
        image: "image.jpg",
        createdAt: new Date(),
      };

      const posts = [post];

      return fs
        .writeFile(FS_POSTS, JSON.stringify(posts))
        .then(() => PostRepository.findById("post-3"))
        .then((post: IPostData | null) => {
          expect(post!.id).to.equal("post-3");
          expect(post!.author).to.equal("user-1");
          expect(post!.title).to.equal("Post Title");
          expect(post!.description).to.equal("Post Description");
          expect(post!.image).to.equal("image.jpg");
          expect(new Date(post!.createdAt)).to.be.instanceOf(Date);
        });
    });
  });

  describe("findAll", () => {
    it("finds all posts", () => {
      const post: IPostData = {
        id: "post-3",
        author: "user-1",
        title: "Post Title",
        description: "Post Description",
        image: "image.jpg",
        createdAt: new Date(),
      };

      const posts = [post];
      return fs
        .writeFile(FS_POSTS, JSON.stringify(posts))
        .then(() => PostRepository.findAll())
        .then((posts: IPostData[]) => {
          expect(posts).to.have.lengthOf(1);
          expect(posts[0].id).to.equal("post-3");
          expect(posts[0].author).to.equal("user-1");
          expect(posts[0].title).to.equal("Post Title");
          expect(posts[0].description).to.equal("Post Description");
          expect(posts[0].image).to.equal("image.jpg");
          expect(new Date(posts[0].createdAt)).to.be.instanceOf(Date);
        });
    });
  });

  describe("findByAuthor", () => {
    it("finds posts by authorId", () => {
      const post1: IPostData = {
        id: "post-1",
        author: "user-1",
        title: "Post 1 Title",
        description: "Post 1 Description",
        image: "image1.jpg",
        createdAt: new Date(),
      };

      const post2: IPostData = {
        id: "post-2",
        author: "user-2",
        title: "Post 2 Title",
        description: "Post 2 Description",
        image: "image2.jpg",
        createdAt: new Date(),
      };

      const posts = [post1, post2];

      const json = JSON.stringify(posts);

      return fs
        .writeFile(FS_POSTS, json)
        .then(() => PostRepository.findByAuthor("user-1"))
        .then((userPosts: IPostData[]) => {
          expect(userPosts).to.have.lengthOf(1);
          expect(userPosts[0].id).to.equal("post-1");
          expect(userPosts[0].author).to.equal("user-1");
          expect(userPosts[0].title).to.equal("Post 1 Title");
          expect(userPosts[0].description).to.equal("Post 1 Description");
          expect(userPosts[0].image).to.equal("image1.jpg");
          expect(new Date(userPosts[0].createdAt)).to.be.instanceOf(Date);
        });
    });
  });

  describe("remove", () => {
    it("removes a post by id", () => {
      const post: IPostData = {
        id: "post-3",
        author: "user-1",
        title: "Post Title",
        description: "Post Description",
        image: "image.jpg",
        createdAt: new Date(),
      };

      const posts = [post];

      return fs
        .writeFile(FS_POSTS, JSON.stringify(posts))
        .then(() => PostRepository.removeById("post-3"))
        .then(() => fs.readFile(FS_POSTS, "utf8"))
        .then((json) => JSON.parse(json))
        .then((posts: IPostData[]) => {
          expect(posts).to.have.lengthOf(0);
        });
    });
  });

  describe("generateId", () => {
    it("generates a unique id", () => {
      const id1 = PostRepository.generateId();
      const id2 = PostRepository.generateId();

      expect(id1).to.not.equal(id2);
      expect(id1).to.be.a("string");
      expect(id2).to.be.a("string");
    });
  });

  afterEach(() => fs.writeFile(FS_POSTS, "[]"));
});
