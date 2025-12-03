import { expect } from "chai";
import { connect, disconnect, User } from "../data/repository/no-sql/index.js";
import { createPost } from "./createPost.js";
import { PostRepository } from "../data/repository/no-sql/PostRepository.js";
import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
import { ValidationError, NotFoundError } from "./errors.js";
import { registerUser } from "./registerUser.js";

const { MONGO_URL = "mongodb://localhost:27017/product-api-test" } =
  process.env;

describe.only("createPost", () => {
  before(() => connect(MONGO_URL));

  beforeEach(() =>
    Promise.all([PostRepository.removeAll(), UserRepository.removeAll()])
  );

  it("creates a new post from a valid user", () => {
    return registerUser(
      "John Doe",
      "johndoe@example.com",
      "johndoe",
      "password",
      "http://image.com/avatar"
    )
      .then((user) => {
        return createPost(
          author,
          "Post Title",
          "Post Description",
          "http://image.com/post"
        ).then(() => {
          return user;
        });
      })
      .then((user) => {
        PostRepository.findAll().then((posts) => {
          expect(posts).to.have.lengthOf(1);
          expect(posts[0].author).to.equal(user.id);
          expect(posts[0].title).to.equal("Post Title");
          expect(posts[0].description).to.equal("Post Description");
          expect(posts[0].image).to.equal("http://image.com/post");
          expect(new Date(posts[0].createdAt)).to.be.instanceOf(Date);
        });
      });
  });

  // it("creates a new post with valid data", () => {

  //   return createPost(
  //     user.id,
  //     "Post Title",
  //     "Post Description",
  //     "http://image.com/post"
  //   )
  //     .then(() => PostRepository.findAll())
  //     .then((posts) => {
  //       expect(posts).to.have.lengthOf(1);
  //       expect(posts[0].author).to.equal(user.id);
  //       expect(posts[0].title).to.equal("Post Title");
  //       expect(posts[0].description).to.equal("Post Description");
  //       expect(posts[0].image).to.equal("http://image.com/post");
  //       expect(new Date(posts[0].createdAt)).to.be.instanceOf(Date);
  //     });
  // });

  //   it("fails if author does not exist", () => {
  //     const fakeUserId = UserRepository.generateId();
  //     return createPost(
  //       fakeUserId,
  //       "Title",
  //       "Description",
  //       "http://image.com/post"
  //     )
  //       .then(() => {
  //         throw new Error("Should have thrown NotFoundError");
  //       })
  //       .catch((error) => {
  //         expect(error).to.be.instanceOf(NotFoundError);
  //         expect(error.message).to.equal("author does not exist");
  //       });
  //   });

  //   it("fails if image is empty", () => {
  //     const user = {
  //       id: UserRepository.generateId(),
  //       name: "Jane Doe",
  //       email: "janedoe@example.com",
  //       username: "janedoe",
  //       password: "password",
  //       avatar: "http://image.com/avatar2",
  //     };
  //     UserRepository.save(user);

  //     try {
  //       // @ts-ignore
  //       createPost(user.id, "Title", "Description", "");
  //     } catch (error) {
  //       expect(error).to.be.instanceOf(ValidationError);
  //       expect(error.message).to.equal("invalid image min length");
  //     }
  //   });

  //   it("fails if description exceeds max length", () => {
  //     const user = {
  //       id: UserRepository.generateId(),
  //       name: "Max Desc",
  //       email: "maxdesc@example.com",
  //       username: "maxdesc",
  //       password: "password",
  //       avatar: "http://image.com/avatar3",
  //     };
  //     UserRepository.save(user);

  //     const longDescription = "a".repeat(501);

  //     try {
  //       createPost(user.id, "Title", longDescription, "http://image.com/post");
  //     } catch (error) {
  //       expect(error).to.be.instanceOf(ValidationError);
  //       expect(error.message).to.equal("invalid description max length");
  //     }
  //   });

  //   it("fails if title is only whitespace", () => {
  //     const user = {
  //       id: UserRepository.generateId(),
  //       name: "Whitespace",
  //       email: "white@example.com",
  //       username: "whitespace",
  //       password: "password",
  //       avatar: "http://image.com/avatar4",
  //     };
  //     UserRepository.save(user);

  //     try {
  //       createPost(user.id, "   ", "Description", "http://image.com/post");
  //     } catch (error) {
  //       expect(error).to.be.instanceOf(ValidationError);
  //       expect(error.message).to.equal("invalid title min length");
  //     }
  //   });

  //   after(() => disconnect());
  // });

  // We recommend installing an extension to run mocha tests.
  //       expect(posts[0].image).to.equal("http://image.com/post");
  //       expect(new Date(posts[0].createdAt)).to.be.instanceOf(Date);
  //     });
  // });

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

  // it("creates a new post", () => {
  //   return createPost(
  //     "123456789012345678901234",
  //     "Post Title",
  //     "Post Description",
  //     "http://image.com/post"
  //   )
  //     .then(() => PostRepository.findAll())
  //     .then((posts) => {
  //       expect(posts).to.exist;
  //       expect(posts).to.be.an("array");
  //       expect(posts.length).to.equal(1);

  //       const post = posts[0];

  //       expect(post.id).to.exist;
  //       expect(post.author).to.equal("123456789012345678901234");
  //       expect(post.title).to.equal("Post Title");
  //       expect(post.description).to.equal("Post Description");
  //       expect(post.image).to.equal("http://image.com/post");
  //       expect(post.createdAt).to.be.instanceOf(Date);
  //     });
  // });

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
