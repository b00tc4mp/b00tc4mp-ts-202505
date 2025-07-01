import { expect } from "chai";
import { PostRepository } from "./PostRepository.js";
import { prisma } from "./index.js";
import { IPostData, IUserData } from "../types.js";

describe.only("PostRepository (SQL)", () => {
  beforeEach(() =>
    Promise.all([prisma.user.deleteMany({}), prisma.post.deleteMany({})])
  );

  describe("save", () => {
    it("saves a new post", () => {
      const user: IUserData = {
        id: "012345678901234567890143",
        name: "Bustamante",
        email: "busta@gmail.com",
        username: "busta",
        password: "123123123",
      };

      return prisma.user
        .create({
          data: user,
        })
        .then(() => {
          const post: IPostData = {
            id: "012345678901234567890567",
            author: "012345678901234567890143",
            title: "HELLO hello",
            description: "un post con Manu",
            image: "https://example.com/image.jpg",
            createdAt: new Date(),
          };

          return PostRepository.save(post);
        })
        .then(() =>
          prisma.post
            .findUnique({
              where: {
                id: "012345678901234567890567",
              },
            })
            .then((post) => {
              expect(post).to.exist;
              expect(post!.authorId).to.equal("012345678901234567890143");
              expect(post!.title).to.equal("HELLO hello");
              expect(post!.description).to.equal("un post con Manu");
              expect(post!.image).to.equal("https://example.com/image.jpg");
              expect(new Date(post!.createdAt)).to.be.instanceOf(Date);
            })
        );
    });
  });

  afterEach(() =>
    Promise.all([prisma.user.deleteMany({}), prisma.post.deleteMany({})])
  );
});
