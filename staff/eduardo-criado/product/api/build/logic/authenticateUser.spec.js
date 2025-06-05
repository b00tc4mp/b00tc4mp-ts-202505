import { expect } from "chai";
import { connect, disconnect, User } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js";
import { NotFoundError, PasswordError } from "./errors.js";
const { MONGO_URL_TEST = "mongodb://localhost:27017/product-api-test" } = process.env;
describe("authenticateUser", () => {
    before(() => connect(MONGO_URL_TEST));
    beforeEach(() => User.deleteMany());
    it("authenticates on existing user", () => {
        let existingUserId;
        return User.create({
            name: "Wendy Darling",
            email: "wendydarling@mail.com",
            username: "wendydarling",
            password: "123123123",
        })
            .then((user) => (existingUserId = user.id)) // equal to ._id.toString()
            .then(() => authenticateUser("wendydarling", "123123123"))
            .then((userId) => expect(userId).to.equal(existingUserId));
    });
    it("fails on non-existing user", () => {
        let errorThrown;
        return authenticateUser("wendydarling", "123123123")
            .catch((error) => (errorThrown = error))
            .finally(() => {
            expect(errorThrown).to.be.instanceOf(NotFoundError);
            expect(errorThrown.message).to.equal("user not found");
        });
    });
    it("fails on existing user but wrong password", () => {
        let errorThrown;
        return User.create({
            name: "Wendy Darling",
            email: "wendydarling@mail.com",
            username: "wendydarling",
            password: "123123123",
        })
            .then(() => authenticateUser("wendydarling", "123123123_"))
            .catch((error) => (errorThrown = error))
            .finally(() => {
            expect(errorThrown).to.be.instanceOf(PasswordError);
            expect(errorThrown.message).to.equal("wrong password");
        });
    });
    it("fails on existing user but wrong username", () => {
        let errorThrown;
        return User.create({
            name: "Wendy Darling",
            email: "wendydarling@mail.com",
            username: "wendydarling",
            password: "123123123",
        })
            .then(() => authenticateUser("wendydarling_", "123123123"))
            .catch((error) => (errorThrown = error))
            .finally(() => {
            expect(errorThrown).to.be.instanceOf(NotFoundError);
            expect(errorThrown.message).to.equal("user not found");
        });
    });
    afterEach(() => User.deleteMany());
    after(() => disconnect());
});
//# sourceMappingURL=authenticateUser.spec.js.map