import { expect } from "chai";
import { UserRepository } from "./UserRepository.js";
import { connect, disconnect, User } from "./index.js";
import { Types } from "mongoose";
const { MONGO_URL = "mongodb://localhost:27017/product-api-test" } = process.env;
describe("UserRepository (No-SQL)", () => {
    before(() => connect(MONGO_URL));
    beforeEach(() => User.deleteMany());
    describe("save", () => {
        it("saves a new user", () => {
            const user = {
                id: "012345678901234567890123",
                name: "Ed U",
                email: "edu@mail.com",
                username: "edu",
                password: "123123123",
            };
            return UserRepository.save(user)
                .then(() => User.findById(user.id))
                .then((user) => {
                if (!user)
                    throw new Error("user not found");
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
            const user = {
                id: "012345678901234567890123",
                name: "Ed U",
                email: "edu@mail.com",
                username: "edu",
                password: "123123123",
            };
            const users = [user];
            const json = JSON.stringify(users);
            const userDoc = {
                _id: new Types.ObjectId(user.id),
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
            };
            return User.create(userDoc)
                .then(() => UserRepository.findByUsername("edu"))
                .then((user) => {
                expect(user).to.exist;
                expect(user.name).to.equal("Ed U");
                expect(user.email).to.equal("edu@mail.com");
                expect(user.username).to.equal("edu");
                expect(user.password).to.equal("123123123");
            });
        });
    });
    describe("findById", () => {
        it("finds a user by username", () => {
            const user = {
                id: "012345678901234567890123",
                name: "Ed U",
                email: "edu@mail.com",
                username: "edu",
                password: "123123123",
            };
            const userDoc = {
                _id: new Types.ObjectId(user.id),
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
            };
            return User.create(userDoc)
                .then(() => UserRepository.findById("012345678901234567890123"))
                .then((user) => {
                expect(user).to.exist;
                expect(user.name).to.equal("Ed U");
                expect(user.email).to.equal("edu@mail.com");
                expect(user.username).to.equal("edu");
                expect(user.password).to.equal("123123123");
            });
        });
    });
    describe("removeAll", () => {
        it("removes all users", () => {
            const user = {
                id: "012345678901234567890123",
                name: "Ed U",
                email: "edu@mail.com",
                username: "edu",
                password: "123123123",
            };
            const user2 = {
                id: "012345678901234567890124",
                name: "Ed U 2",
                email: "edu2@mail.com",
                username: "edu2",
                password: "123123123",
            };
            const user3 = {
                id: "012345678901234567890125",
                name: "Ed U 3",
                email: "edu3@mail.com",
                username: "edu3",
                password: "123123123",
            };
            const userDoc = {
                _id: new Types.ObjectId(user.id),
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
            };
            const user2Doc = {
                _id: new Types.ObjectId(user2.id),
                name: user2.name,
                email: user2.email,
                username: user2.username,
                password: user2.password,
            };
            const user3Doc = {
                _id: new Types.ObjectId(user3.id),
                name: user3.name,
                email: user3.email,
                username: user3.username,
                password: user3.password,
            };
            const userDocs = [userDoc, user2Doc, user3Doc];
            return User.insertMany(userDocs)
                .then(() => UserRepository.removeAll())
                .then(() => User.countDocuments())
                .then((count) => expect(count).to.equal(0));
        });
    });
    describe("generateId", () => {
        it("creates a new user id", () => {
            const id = UserRepository.generateId();
            expect(id).to.be.a.string;
            expect(id).to.have.lengthOf(24);
        });
    });
    describe("filter users", () => {
        it("return users according to only one search params", () => {
            const user = {
                id: "012345678901234567890123",
                name: "Ed U",
                email: "edu@mail.com",
                username: "edu",
                password: "123123123",
            };
            const user2 = {
                id: "012345678901234567890124",
                name: "Ed U 2",
                email: "edu2@mail.com",
                username: "edu2",
                password: "123123123",
            };
            const user3 = {
                id: "012345678901234567890125",
                name: "Ed U 3",
                email: "edu3@mail.com",
                username: "edu3",
                password: "123123123",
            };
            const userDoc = {
                _id: new Types.ObjectId(user.id),
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
            };
            const user2Doc = {
                _id: new Types.ObjectId(user2.id),
                name: user2.name,
                email: user2.email,
                username: user2.username,
                password: user2.password,
            };
            const user3Doc = {
                _id: new Types.ObjectId(user3.id),
                name: user3.name,
                email: user3.email,
                username: user3.username,
                password: user3.password,
            };
            const userDocs = [userDoc, user2Doc, user3Doc];
            return User.insertMany(userDocs)
                .then(() => 
            // UserRepository.filter(
            //   { username: "edu3" },
            //   { username: -1 },
            //   { page: 1, size: 1 }
            // )
            UserRepository.filter({ name: "Ed U 2", username: "edu3", email: "edu@mail.com" }, { username: -1 }, { page: 1, size: 1 }))
                .then((users) => {
                expect(users.length).to.equal(1);
                expect(users[0].name).to.equal("Ed U 3");
                expect(users[0].email).to.equal("edu3@mail.com");
                expect(users[0].username).to.equal("edu3");
                expect(users[0].password).to.equal("123123123");
            });
        });
        it("return users according to search params", () => {
            const user = {
                id: "012345678901234567890123",
                name: "Ed U",
                email: "edu@mail.com",
                username: "edu",
                password: "123123123",
            };
            const user2 = {
                id: "012345678901234567890124",
                name: "Ed U 2",
                email: "edu2@mail.com",
                username: "edu2",
                password: "123123123",
            };
            const user3 = {
                id: "012345678901234567890125",
                name: "Ed U 3",
                email: "edu3@mail.com",
                username: "edu3",
                password: "123123123",
            };
            const user4 = {
                id: "012345678901234567890126",
                name: "Ed U 4",
                email: "edu4@mail.com",
                username: "edu4",
                password: "123123123",
            };
            const userDoc = {
                _id: new Types.ObjectId(user.id),
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password,
            };
            const user2Doc = {
                _id: new Types.ObjectId(user2.id),
                name: user2.name,
                email: user2.email,
                username: user2.username,
                password: user2.password,
            };
            const user3Doc = {
                _id: new Types.ObjectId(user3.id),
                name: user3.name,
                email: user3.email,
                username: user3.username,
                password: user3.password,
            };
            const user4Doc = {
                _id: new Types.ObjectId(user4.id),
                name: user4.name,
                email: user4.email,
                username: user4.username,
                password: user4.password,
            };
            const userDocs = [userDoc, user2Doc, user3Doc, user4Doc];
            return User.insertMany(userDocs)
                .then(() => 
            // UserRepository.filter(
            //   { username: "edu4", name: "Ed U 3" },
            //   { username: 1 },
            //   { page: 1, size: 2 }
            // )
            UserRepository.filter({ username: "edu4", name: "Ed U 3", email: "edu3@mail.com" }, { username: 1 }, { page: 1, size: 2 }))
                .then((users) => {
                expect(users.length).to.equal(2);
                expect(users[0].name).to.equal("Ed U 3");
                expect(users[0].email).to.equal("edu3@mail.com");
                expect(users[0].username).to.equal("edu3");
                expect(users[0].password).to.equal("123123123");
                expect(users[1].name).to.equal("Ed U 4");
                expect(users[1].email).to.equal("edu4@mail.com");
                expect(users[1].username).to.equal("edu4");
                expect(users[1].password).to.equal("123123123");
            });
        });
    });
    afterEach(() => User.deleteMany());
    after(() => disconnect());
});
//# sourceMappingURL=UserRepository.spec.js.map