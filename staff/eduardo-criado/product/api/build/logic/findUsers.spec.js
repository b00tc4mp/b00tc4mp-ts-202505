import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { findUsers } from "./findUsers.js";
import { NotFoundError, ValidationError } from "./errors.js";
import { Types } from "mongoose";
// import { UserRepository } from "../data/repository/fs/UserRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
const { MONGO_URL = "mongodb://localhost:27017/b00tc4mp-ts-202505-test" } = process.env;
const { ObjectId } = Types;
describe("findUsers", () => {
    before(() => connect(MONGO_URL));
    beforeEach(() => UserRepository.removeAll());
    it("gets info on existing user", () => {
        return (Promise.all([
            UserRepository.save({
                id: "68505d6ee96dfc66eb4a9fe9",
                name: "Wendy Darling",
                email: "wendydarling@mail.com",
                username: "wendydarling",
                password: "123123123",
            }),
        ])
            .then((user) => findUsers("68505d6ee96dfc66eb4a9fe9"))
            //   .then((user) => findUsers("id = '68505d6ee96dfc66eb4a9fe9'", "name", 1, 10))
            .then((user) => {
            expect(user.name).to.equal("Wendy Darling");
            expect(user.email).to.equal("wendydarling@mail.com");
            expect(user.username).to.equal("wendydarling");
            expect(user.password).to.equal("123123123");
        }));
    });
    it("fails on non-existing user id", () => {
        let errorThrown;
        return findUsers(new ObjectId().toString())
            .catch((error) => (errorThrown = error))
            .finally(() => {
            expect(errorThrown).to.be.instanceOf(NotFoundError);
            expect(errorThrown.message).to.equal("user not found");
        });
    });
    it("fails on invalid user id type", () => {
        let errorThrown;
        try {
            /* @ts-ignore */
            findUsers(true);
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid user id type");
        }
    });
    it("fails on invalid user id format", () => {
        let errorThrown;
        try {
            // findUsers("5f8a1f8a1f8a1f8a1f8a1f8zZZZ");
            findUsers("invalid_id");
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid user id format");
        }
    });
    it("fails on null user id", () => {
        let errorThrown;
        try {
            // @ts-ignore
            findUsers(null);
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid user id type");
        }
    });
    it("fails on undefined user id", () => {
        let errorThrown;
        try {
            // @ts-ignore
            findUsers(undefined);
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid user id type");
        }
    });
    it("fails on object as user id", () => {
        let errorThrown;
        try {
            // @ts-ignore
            findUsers({});
        }
        catch (error) {
            errorThrown = error;
        }
        finally {
            expect(errorThrown).to.be.instanceOf(ValidationError);
            expect(errorThrown.message).to.equal("invalid user id type");
        }
    });
    afterEach(() => UserRepository.removeAll());
    after(() => disconnect());
});
//# sourceMappingURL=findUsers.spec.js.map