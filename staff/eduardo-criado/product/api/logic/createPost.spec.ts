import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { registerUser } from "./registerUser.js";
import { createPost } from "./createPost.js";
// import { PostRepository } from "../data/repository/no-sql/PostRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
import { PostRepository } from "../data/repository/fs/PostRepository.js";
import { UserRepository } from "../data/repository/fs/UserRepository.js";
import { ValidationError } from "./errors.js";

const { MONGO_URL = "mongodb://localhost:27017/product-api-test" } =
  process.env;

describe("createPost", () => {
  before(() => connect(MONGO_URL));

  beforeEach(() =>
    Promise.all([PostRepository.removeAll(), UserRepository.removeAll()])
  );
  it("creates a new post from a valid user", () => {
    return UserRepository.save({
      id: "123456789012345678901234",
      name: "John Mikel",
      email: "jmike@me.com",
      username: "jmikel",
      password: "password",
      avatar: "http://image.com/avatar",
    })

      .then(() => {
        return createPost(
          "123456789012345678901234", // authorId
          "Post Title",
          "Post Description",
          "http://image.com/post"
        );
      })
      .then(() => {
        return PostRepository.findAll().then((posts) => {
          expect(posts).to.have.lengthOf(1);
          expect(posts[0].author).to.equal("123456789012345678901234");
          expect(posts[0].title).to.equal("Post Title");
          expect(posts[0].description).to.equal("Post Description");
          expect(posts[0].image).to.equal("http://image.com/post");
          expect(new Date(posts[0].createdAt)).to.be.instanceOf(Date);
        });
      });
  });

  it("fails on invalid author id format", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      createPost("", "Post Title", "Post Description", "http://image.com/post");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.exist;
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid author id format");
    }
  });
  it("fails on invalid title type", () => {
    let errorThrown: Error;
    try {
      createPost(
        "123456789012345678901234",
        /* @ts-ignore */
        undefined,
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
      createPost(
        "123456789012345678901234",
        "Post Title",
        /* @ts-ignore */
        undefined,
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
//# sourceMappingURL=createPost.spec.js.map
