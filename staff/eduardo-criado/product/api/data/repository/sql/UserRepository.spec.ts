import { expect } from "chai";
import { UserRepository } from "./UserRepository.js";
import { IUserData } from "../types.js";
import { prisma } from "./index.js";

describe.only("UserRepository (SQL)", () => {
  beforeEach(() => prisma.user.deleteMany({}));

  describe("save", () => {
    it("saves a new user", () => {
      const user: IUserData = {
        id: "012345678901234567890123",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };

      return UserRepository.save(user)
        .then(() =>
          prisma.user.findFirst({ where: { id: "012345678901234567890123" } })
        )
        .then((user) => {
          if (!user) throw new Error("user not found");

          expect(user.id).to.equal("012345678901234567890123");
          expect(user.name).to.equal("Ed U");
          expect(user.email).to.equal("edu@mail.com");
          expect(user.username).to.equal("edu");
          expect(user.password).to.equal("123123123");
        });
    });
  });

  describe("findByUsername", () => {
    it("finds a user by username", () => {
      const user: IUserData = {
        id: "012345678901234567890123",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };

      return prisma.user
        .create({
          data: user,
        })
        .then(() => UserRepository.findByUsername("edu"))
        .then((user: IUserData | null) => {
          expect(user).to.exist;
          expect(user!.name).to.equal("Ed U");
          expect(user!.email).to.equal("edu@mail.com");
          expect(user!.username).to.equal("edu");
          expect(user!.password).to.equal("123123123");
        });
    });
  });

  describe("findById", () => {
    it("finds a user by username", () => {
      const user: IUserData = {
        id: "012345678901234567890123",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };

      return prisma.user
        .create({
          data: user,
        })
        .then(() => UserRepository.findById("012345678901234567890123"))
        .then((user: IUserData | null) => {
          expect(user).to.exist;
          expect(user!.name).to.equal("Ed U");
          expect(user!.email).to.equal("edu@mail.com");
          expect(user!.username).to.equal("edu");
          expect(user!.password).to.equal("123123123");
        });
    });
  });

  describe("removeAll", () => {
    it("removes all users", () => {
      const user: IUserData = {
        id: "012345678901234567890123",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };

      const user2: IUserData = {
        id: "012345678901234567890124",
        name: "Ed U 2",
        email: "edu2@mail.com",
        username: "edu2",
        password: "123123123",
      };

      const user3: IUserData = {
        id: "012345678901234567890125",
        name: "Ed U 3",
        email: "edu3@mail.com",
        username: "edu3",
        password: "123123123",
      };

      return prisma.user
        .createMany({
          data: [user, user2, user3],
        })
        .then(() => UserRepository.removeAll())
        .then(() => prisma.user.count())
        .then((count) => expect(count).to.equal(0));
    });
  });

  describe("generateId", () => {
    it("creates a new user id", () => {
      const id = UserRepository.generateId();

      expect(id).to.be.a.string;
    });
  });

  describe("filter users", () => {
    it("filter users according to search params", () => {
      const user: IUserData = {
        id: "012345678901234567890123",
        name: "Ed U",
        email: "edu@mail.com",
        username: "edu",
        password: "123123123",
      };

      const user2: IUserData = {
        id: "012345678901234567890124",
        name: "Ed U 2",
        email: "edu2@mail.com",
        username: "edu2",
        password: "123123123",
      };

      const user3: IUserData = {
        id: "012345678901234567890125",
        name: "Ed U 3",
        email: "edu3@mail.com",
        username: "edu3",
        password: "123123123",
      };

      return prisma.user
        .createMany({
          data: [user, user2, user3],
        })
        .then(() =>
          UserRepository.filter(
            { email: "edu2@mail.com", username: "edu3" },
            { email: 1 },
            { page: 1, size: 1 }
          )
        )
        .then((users) => {
          expect(users.length).to.equal(1);
          expect(users[0].email).to.equal("edu2@mail.com");
          expect(users[0].username).to.equal("edu2");
          expect(users[0].password).to.equal("123123123");
          expect(users[0].name).to.equal("Ed U 2");
          expect(users[0].id).to.equal("012345678901234567890124");
        });
    });
  });

  afterEach(() => prisma.user.deleteMany({}));
});
