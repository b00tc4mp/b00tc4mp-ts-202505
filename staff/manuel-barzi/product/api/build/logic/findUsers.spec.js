import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { findUsers } from "./findUsers.js";
import { Types } from "mongoose";
import { UserRepository } from "../data/repository/fs/UserRepository.js";
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js"
// import { UserRepository } from "../data/repository/sql/UserRepository.js"
const { MONGO_URL = "mongodb://localhost:27017/b00tc4mp-ts-202505-test" } = process.env;
const { ObjectId } = Types;
describe("findUsers", () => {
    before(() => connect(MONGO_URL));
    beforeEach(() => UserRepository.removeAll());
    it("find users according to params", () => {
        return Promise.all([
            UserRepository.save({
                id: "68505d6ee96dfc66eb4a9f01",
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
            })
        ])
            .then(() => findUsers("68505d6ee96dfc66eb4a9f01", "Pe", "username", "asc", 1, 1))
            .then((users) => {
            expect(users).to.be.instanceOf(Array);
            expect(users).to.have.lengthOf(1);
            expect(users[0].name).to.equal("Pepito Grillo");
            expect(users[0].email).to.equal("pepitogrillo@mail.com");
            expect(users[0].username).to.equal("pepitogrillo");
            expect(users[0].password).to.equal("123123123");
        });
    });
    afterEach(() => UserRepository.removeAll());
    after(() => disconnect());
});
//# sourceMappingURL=findUsers.spec.js.map