import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { createPost } from "./createPost.js";
import { PostRepository } from "../data/repository/no-sql/PostRepository.js";
import { ValidationError } from "./errors.js";

const { MONGO_URL_TEST = "mongodb://localhost:27017/product-api-test" } =
  process.env;

describe("createPost", () => {
  before(() => connect(MONGO_URL_TEST));

  beforeEach(() => PostRepository.removeAll());

  // it("creates a new post", () => {
  //     const postData = {
  //         id: PostRepository.generateId(),
  //         author: "123456789012345678901234",
  //         title: "Post Title",
  //         description: "Post Description",
  //         image: "http://image.com/post",
  //         createdAt: new Date(),
  //     };

  //     return createPost(postData)
  //         .then(() => PostRepository.findById(postData.id))
  //         .then((post) => {
  //             expect(post).to.exist;
  //             if (!post) throw new Error("post not found");

  //             expect(post.id).to.equal(postData.id);
  //             expect(post.author).to.equal(postData.author);
  //             expect(post.title).to.equal(postData.title);
  //             expect(post.description).to.equal(postData.description);
  //             expect(post.image).to.equal(postData.image);
  //             expect(post.createdAt).to.be.instanceOf(Date);
  //         });
  // });

  it("creates a new post", () => {
    return createPost(
      "123456789012345678901234",
      "Post Title",
      "Post Description",
      "http://image.com/post"
    )
      .then(() => PostRepository.findAll())
      .then((posts) => {
        expect(posts).to.exist;
        expect(posts).to.be.an("array");
        expect(posts.length).to.equal(1);

        const post = posts[0];

        expect(post.id).to.exist;
        expect(post.author).to.equal("123456789012345678901234");
        expect(post.title).to.equal("Post Title");
        expect(post.description).to.equal("Post Description");
        expect(post.image).to.equal("http://image.com/post");
        expect(post.createdAt).to.be.instanceOf(Date);
      });
  });

  it("fails on invalid author", () => {
    let errorThrown: Error;

    return createPost(
      "",
      "Post Title",
      "Post Description",
      "http://image.com/post"
    )
      .catch((error) => {
        errorThrown = error;
      })
      .then(() => {
        expect(errorThrown).to.exist;
        expect(errorThrown).to.be.instanceOf(ValidationError);
        expect(errorThrown.message).to.equal("author is empty or blank");
      });
  });

  it("fails on invalid title type", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      createPost(
        "123456789012345678901234",
        "",
        "Post Description",
        "http://image.com/post"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.exist;
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid title type");
    }
  });

  it("fails on invalid title min length", () => {
    let errorThrown: Error;

    try {
      createPost(
        "123456789012345678901234",
        "",
        "Post Description",
        "http://image.com/post"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.exist;
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid title min length");
    }
  });

  it("fails on invalid title max length", () => {
    let errorThrown: Error;

    try {
      createPost(
        "123456789012345678901234",
        "01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "Post Description",
        "http://image.com/post"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.exist;
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid title max length");
    }
  });

  it("fails on invalid description type", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      createPost(
        "123456789012345678901234",
        "Post Title",
        "",
        "http://image.com/post"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.exist;
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid description type");
    }
  });

  after(() => disconnect());
});
