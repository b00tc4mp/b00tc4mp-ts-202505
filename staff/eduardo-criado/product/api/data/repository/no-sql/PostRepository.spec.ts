import { expect } from "chai";
import { PostRepository } from "./PostRepository.js";
import { IPostData } from "../types.js";
import { connect, disconnect, Post } from "./index.js";
import { Types } from "mongoose";

const { MONGO_URL = "mongodb://localhost:27017/product-api-test" } =
  process.env;

describe("PostRepository (No-SQL)", () => {
  before(() => connect(MONGO_URL));

  beforeEach(() => Post.deleteMany());

  describe("save", () => {
    it("saves a new post", () => {
      const post: IPostData = {
        id: "012345678901234567890123",
        author: "123456789012345678901234",
        title: "Post Title",
        description: "Post Description",
        image: "http://image.com/post",
        createdAt: new Date(),
      };

      return PostRepository.save(post)
        .then(() => Post.findById(post.id))
        .then((post) => {
          if (!post) throw new Error("post not found");

          expect(post.id).to.equal("012345678901234567890123");
          expect(post.author.toString()).to.equal("123456789012345678901234");
          expect(post.title).to.equal("Post Title");
          expect(post.description).to.equal("Post Description");
          expect(post.image).to.equal("http://image.com/post");
          expect(post.createdAt).to.be.instanceOf(Date);
        });
    });

    describe("findById", () => {
      it("finds a post by id", () => {
        const post: IPostData = {
          id: "012345678901234567890123",
          author: "123456789012345678901234",
          title: "Post Title",
          description: "Post Description",
          image: "http://image.com/post",
          createdAt: new Date(),
        };

        return PostRepository.save(post)
          .then(() => PostRepository.findById(post.id))
          .then((foundPost) => {
            if (!foundPost) throw new Error("post not found");

            expect(foundPost.id).to.equal("012345678901234567890123");
            expect(foundPost.author).to.equal("123456789012345678901234");
            expect(foundPost.title).to.equal("Post Title");
            expect(foundPost.description).to.equal("Post Description");
            expect(foundPost.image).to.equal("http://image.com/post");
            expect(foundPost.createdAt).to.be.instanceOf(Date);
          });
      });
    });

    describe("findAll", () => {
      it("finds all posts", () => {
        const post: IPostData = {
          id: "012345678901234567890123",
          author: "123456789012345678901234",
          title: "Post Title",
          description: "Post Description",
          image: "http://image.com/post",
          createdAt: new Date(),
        };

        return PostRepository.save(post)
          .then(() => PostRepository.findAll())
          .then((posts) => {
            expect(posts).to.have.lengthOf(1);
            expect(posts[0].id).to.equal("012345678901234567890123");
            expect(posts[0].author).to.equal("123456789012345678901234");
            expect(posts[0].title).to.equal("Post Title");
            expect(posts[0].description).to.equal("Post Description");
            expect(posts[0].image).to.equal("http://image.com/post");
            expect(posts[0].createdAt).to.be.instanceOf(Date);
          });
      });
    });

    describe("findByAuthor", () => {
      it("finds posts by author", () => {
        const post: IPostData = {
          id: "012345678901234567890123",
          author: "123456789012345678901234",
          title: "Post Title",
          description: "Post Description",
          image: "http://image.com/post",
          createdAt: new Date(),
        };

        return PostRepository.save(post)
          .then(() => PostRepository.findByAuthor(post.author))
          .then((posts) => {
            expect(posts).to.have.lengthOf(1);
            expect(posts[0].id).to.equal("012345678901234567890123");
            expect(posts[0].author).to.equal("123456789012345678901234");
            expect(posts[0].title).to.equal("Post Title");
            expect(posts[0].description).to.equal("Post Description");
            expect(posts[0].image).to.equal("http://image.com/post");
            expect(posts[0].createdAt).to.be.instanceOf(Date);
          });
      });
    });
    describe("remove", () => {
      it("removes a post by id", () => {
        const post: IPostData = {
          id: "012345678901234567890123",
          author: "123456789012345678901234",
          title: "Post Title",
          description: "Post Description",
          image: "http://image.com/post",
          createdAt: new Date(),
        };

        return PostRepository.save(post)
          .then(() => PostRepository.removeById(post.id))
          .then(() => Post.findById(post.id))
          .then((post) => {
            expect(post).to.be.null;
          });
      });
    });
  });

  describe("generateId", () => {
    it("generates a new post id", () => {
      const id = PostRepository.generateId();
      expect(id).to.be.a("string");
      expect(id).to.have.lengthOf(24);
      expect(() => new Types.ObjectId(id)).to.not.throw();
    });
  });

  afterEach(() => Post.deleteMany());

  after(() => disconnect());
});
