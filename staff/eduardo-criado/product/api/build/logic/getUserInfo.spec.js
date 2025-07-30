import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { getUserInfo } from "./getUserInfo.js";
import { NotFoundError, ValidationError } from "./errors.js";
import { Types } from "mongoose";
import { UserRepository } from "../data/repository/sql/UserRepository.js";
const { MONGO_URL = "mongodb://localhost:27017/product-api-test" } = process.env;
const { ObjectId } = Types;
describe("getUserInfo", () => {
    before(() => connect(MONGO_URL));
    beforeEach(() => UserRepository.removeAll());
    it("gets info on existing user", () => {
        return UserRepository.save({
            id: "68505d6ee96dfc66eb4a9fe9",
            name: "Wendy Darling",
            email: "wendydarling@mail.com",
            username: "wendydarling",
            password: "123123123",
        })
            .then((user) => getUserInfo("68505d6ee96dfc66eb4a9fe9")) // equal to ._id.toString()
            .then((user) => {
            expect(user.name).to.equal("Wendy Darling");
            expect(user.email).to.equal("wendydarling@mail.com");
            expect(user.username).to.equal("wendydarling");
            expect(user.password).to.equal("123123123");
        });
    });
    it("fails on non-existing user id", () => {
        let errorThrown;
        // return getUserInfo("5f8a1f8a1f8a1f8a1f8a1f8a")
        return getUserInfo(new ObjectId().toString())
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
            getUserInfo(true);
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
            // getUserInfo("5f8a1f8a1f8a1f8a1f8a1f8zZZZ");
            getUserInfo("invalid_id");
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
            getUserInfo(null);
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
            getUserInfo(undefined);
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
            getUserInfo({});
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
//# sourceMappingURL=getUserInfo.spec.js.map