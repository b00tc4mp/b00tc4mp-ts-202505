import { expect } from "chai";
import { connect, disconnect, User } from "../data/index.js";
import { registerUser } from "./registerUser.js";
import { DuplicityError } from "./errors.js";
const { MONGO_URL_TEST = "mongodb://localhost:27017/b00tc4mp-ts-202505-test" } = process.env;
describe("registerUser", () => {
    before(() => connect(MONGO_URL_TEST));
    beforeEach(() => User.deleteMany());
    it("registers a new user", () => {
        return registerUser("Peter Pan", "peterpan@mail.com", "peterpan", "123123123")
            .then(result => {
            //expect(result).not.to.exist
            expect(result).to.be.undefined;
            return User.findOne({ name: "Peter Pan" }).lean();
        })
            .then(user => {
            //expect(user).to.exist
            expect(user).not.to.be.null;
            if (user) {
                expect(user.name).to.equal("Peter Pan");
                expect(user.email).to.equal("peterpan@mail.com");
                expect(user.username).to.equal("peterpan");
                expect(user.password).to.equal("123123123");
            }
        });
    });
    it("fails on existing user", () => {
        let errorThrown;
        return User.create({ name: "Wendy Darling", email: "wendydarling@mail.com", username: "wendydarling", password: "123123123" })
            .then(() => registerUser("Wendy Darling", "wendydarling@mail.com", "wendydarling", "123123123"))
            .catch(error => errorThrown = error)
            .finally(() => {
            expect(errorThrown).to.be.instanceOf(DuplicityError);
            expect(errorThrown.message).to.equal("user already exists");
        });
    });
    afterEach(() => User.deleteMany());
    after(() => disconnect());
});
//# sourceMappingURL=registerUser.spec.js.map