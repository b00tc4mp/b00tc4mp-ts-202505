import { expect } from "chai";
import { connect, disconnect, User } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js";
import { CredentialsError } from "./errors.js";
const { MONGO_URL_TEST = "mongodb://localhost:27017/b00tc4mp-ts-202505-test" } = process.env;
describe("authenticateUser", () => {
    before(() => connect(MONGO_URL_TEST));
    beforeEach(() => User.deleteMany());
    it("authenticates a user", () => {
        return User.create({
            name: "Eduardo",
            email: "edu@mail.com",
            avatar: "http://image.com/edu",
            username: "edu",
            password: "123123123",
        })
            .then(() => authenticateUser("edu", "123123123"))
            .then((user) => {
            expect(user).not.to.be.null;
            if (user) {
                expect(user.username).to.equal("edu");
                expect(user.password).to.equal("123123123");
            }
        })
            .catch((error) => {
            throw new Error(error.message);
        });
    });
    it("fails on invalid credentials", () => {
        let errorThrown;
        return User.create({
            name: "Eduardo",
            email: "edu@mail.com",
            avatar: "http://image.com/edu",
            username: "edu",
            password: "123123123",
        })
            .then(() => authenticateUser("edu", "wrongpassword"))
            .then(() => {
            throw new Error("Expected CredentialsError, but none was thrown");
        })
            .catch((error) => (errorThrown = error))
            .finally(() => {
            expect(errorThrown).to.be.instanceOf(CredentialsError);
            expect(errorThrown.message).to.equal("invalid credentials");
        });
    });
    afterEach(() => User.deleteMany());
    after(() => {
        disconnect();
    });
});
//# sourceMappingURL=authenticateUser.spec.js.map