import { expect } from "chai"
import { connect, disconnect } from "../data/repository/no-sql/index.js"
// import { UserRepository } from "../data/repository/fs/UserRepository.js"
// import { UserRepository } from "../data/repository/no-sql/UserRepository.js"
import { UserRepository } from "../data/repository/sql/UserRepository.js"
import { authenticateUser } from "./authenticateUser.js"
import { NotFoundError, PasswordError } from "./errors.js"

const { MONGO_URL = "mongodb://localhost:27017/b00tc4mp-ts-202505-test" } = process.env

describe("authenticateUser", () => {
    before(() => connect(MONGO_URL))

    beforeEach(() => UserRepository.removeAll())

    it("authenticates on existing user", () => {
        return UserRepository.save({
            id: "012345678901234567890123", name: "Wendy Darling", email: "wendydarling@mail.com", username: "wendydarling", password: "123123123"
        })
            .then(() => authenticateUser("wendydarling", "123123123"))
            .then(userId => expect(userId).to.equal("012345678901234567890123"))
    })

    it("fails on non-existing user", () => {
        let errorThrown: Error

        return authenticateUser("wendydarling", "123123123")
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on existing user but wrong password", () => {
        let errorThrown: Error

        return UserRepository.save({
            id: "012345678901234567890123", name: "Wendy Darling", email: "wendydarling@mail.com", username: "wendydarling", password: "123123123"
        })
            .then(() => authenticateUser("wendydarling", "123123123_"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(PasswordError)
                expect(errorThrown.message).to.equal("wrong password")
            })
    })

    afterEach(() => UserRepository.removeAll())

    after(() => disconnect())
})