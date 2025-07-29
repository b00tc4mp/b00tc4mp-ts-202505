import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { findUsers } from "./findUsers.js";
import { NotFoundError, ValidationError } from "./errors.js";
import { Types } from "mongoose";
// import { UserRepository } from "../data/repository/fs/UserRepository.js";
import { UserRepository } from "../data/repository/no-sql/UserRepository.js";
// import { UserRepository } from "../data/repository/sql/UserRepository.js";
const { MONGO_URL = "mongodb://localhost:27017/product-api-test" } = process.env;
const { ObjectId } = Types;
describe("findUsers", () => {
    before(() => connect(MONGO_URL));
    beforeEach(() => UserRepository.removeAll());
    it("find users according to params", () => {
        return Promise.all([
            UserRepository.save({
                id: "68505d6ee96dfc66eb4a9fe9",
                name: "Wendy Darling",
                email: "wendydarling@mail.com",
                username: "wendydarling",
                password: "123123123",
            }),
            UserRepository.save({
                id: "68505d6ee96dfc66eb4a9f02",
                name: "Peter Pan",
                email: "peterpan@mail.com",
                username: "peterpan",
                password: "123123123",
            }),
            UserRepository.save({
                id: "68505d6ee96dfc66eb4a9f03",
                name: "Pepito Grillo",
                email: "pepitogrillo@mail.com",
                username: "pepitogrillo",
                password: "123123123",
            }),
            UserRepository.save({
                id: "68505d6ee96dfc66eb4a9f04",
                name: "Campa Nilla",
                email: "campanilla@mail.com",
                username: "campanilla",
                password: "123123123",
            }),
        ])
            .then(() => {
            debugger;
            return findUsers("68505d6ee96dfc66eb4a9f04", "pe", "username", "asc", 1, 2);
        })
            .then((users) => {
            debugger;
            expect(users).to.be.instanceOf(Array);
            expect(users.length).to.equal(2);
            expect(users[0].id).to.equal("68505d6ee96dfc66eb4a9f03");
            expect(users[0].name).to.equal("Pepito Grillo");
            expect(users[0].email).to.equal("pepitogrillo@mail.com");
            expect(users[0].username).to.equal("pepitogrillo");
            expect(users[0].password).to.equal("123123123");
            expect(users[1].id).to.equal("68505d6ee96dfc66eb4a9f02");
            expect(users[1].name).to.equal("Peter Pan");
            expect(users[1].email).to.equal("peterpan@mail.com");
            expect(users[1].username).to.equal("peterpan");
            expect(users[1].password).to.equal("123123123");
        });
    });
    // .then(() =>
    //   findUsers(
    //     "68505d6ee96dfc66eb4a9f04",
    //     "Campa Nilla",
    //     "name",
    //     "asc",
    //     1,
    //     10
    //   )
    // )
    it("fails on non-existing user id", () => {
        let errorThrown;
        return findUsers(new ObjectId().toString(), "", "username", "asc", 1, 10)
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
            findUsers("invalid_id", "", "username", "asc", 1, 10);
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