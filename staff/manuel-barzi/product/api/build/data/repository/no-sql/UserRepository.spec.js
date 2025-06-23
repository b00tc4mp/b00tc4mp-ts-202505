import { expect } from "chai";
import { UserRepository } from "./UserRepository.js";
import { connect, disconnect, User, ObjectId } from "./index.js";
const { MONGO_URL = "mongodb://localhost:27017/b00tc4mp-ts-202505-test" } = process.env;
describe("UserRepository (No-SQL)", () => {
    before(() => connect(MONGO_URL));
    beforeEach(() => User.deleteMany());
    describe("save", () => {
        it("saves a new user", () => {
            const user = { id: "012345678901234567890123", name: "Ed U", email: "edu@mail.com", username: "edu", password: "123123123" };
            return UserRepository.save(user)
                .then(() => User.findById(user.id))
                .then(user => {
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
            const user = { id: "012345678901234567890123", name: "Ed U", email: "edu@mail.com", username: "edu", password: "123123123" };
            const users = [user];
            const json = JSON.stringify(users);
            const userDoc = {
                _id: new ObjectId(user.id),
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password
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
            const user = { id: "012345678901234567890123", name: "Ed U", email: "edu@mail.com", username: "edu", password: "123123123" };
            const userDoc = {
                _id: new ObjectId(user.id),
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password
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
            const user = { id: "012345678901234567890123", name: "Ed U", email: "edu@mail.com", username: "edu", password: "123123123" };
            const user2 = { id: "012345678901234567890124", name: "Ed U 2", email: "edu2@mail.com", username: "edu2", password: "123123123" };
            const user3 = { id: "012345678901234567890125", name: "Ed U 3", email: "edu3@mail.com", username: "edu3", password: "123123123" };
            const userDoc = {
                _id: new ObjectId(user.id),
                name: user.name,
                email: user.email,
                username: user.username,
                password: user.password
            };
            const user2Doc = {
                _id: new ObjectId(user2.id),
                name: user2.name,
                email: user2.email,
                username: user2.username,
                password: user2.password
            };
            const user3Doc = {
                _id: new ObjectId(user3.id),
                name: user3.name,
                email: user3.email,
                username: user3.username,
                password: user3.password
            };
            const userDocs = [userDoc, user2Doc, user3Doc];
            return User.insertMany(userDocs)
                .then(() => UserRepository.removeAll())
                .then(() => User.countDocuments())
                .then(count => expect(count).to.equal(0));
        });
    });
    describe("generateId", () => {
        it("creates a new user id", () => {
            const id = UserRepository.generateId();
            expect(id).to.be.a.string;
            expect(id).to.have.lengthOf(24);
        });
    });
    afterEach(() => User.deleteMany());
    after(() => disconnect());
});
//# sourceMappingURL=UserRepository.spec.js.map