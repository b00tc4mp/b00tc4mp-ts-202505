import { expect } from "chai";
import { connect, disconnect, User } from "../data/index.js";
import { getUserInfo } from "./getUserInfo.js";
import { NotFoundError, ValidationError } from "./errors.js";
import { Types } from "mongoose";
const { MONGO_URL_TEST = "mongodb://localhost:27017/product-api-test" } = process.env;
const { ObjectId } = Types;
describe("getUserInfo", () => {
    before(() => connect(MONGO_URL_TEST));
    beforeEach(() => User.deleteMany());
    it("gets info on existing user", () => {
        return User.create({
            name: "Wendy Darling",
            email: "wendydarling@mail.com",
            username: "wendydarling",
            password: "123123123",
        })
            .then((user) => getUserInfo(user.id)) // equal to ._id.toString()
            .then((user) => {
            expect(user.name).to.equal("Wendy Darling");
            expect(user.email).to.equal("wendydarling@mail.com");
            expect(user.username).to.equal("wendydarling");
            expect(user.password).to.equal("123123123");
        });
    });
    it("fails on non-existing user", () => {
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
    afterEach(() => User.deleteMany());
    after(() => disconnect());
});
//# sourceMappingURL=getUserInfo.spec.js.map