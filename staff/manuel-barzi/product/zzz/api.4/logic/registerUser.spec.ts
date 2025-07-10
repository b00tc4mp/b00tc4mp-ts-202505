import { expect } from "chai"
import { connect, disconnect } from "../data/repository/mongo/index.js"
import { registerUser } from "./registerUser.js"
import { DuplicityError, ValidationError } from "./errors.js"
// import { UserRepository } from "../data/repository/mongo/UserRepository.js"
import { UserRepository } from "../data/repository/fs/UserRepository.js"

const { MONGO_URL_TEST = "mongodb://localhost:27017/b00tc4mp-ts-202505-test" } = process.env

describe("registerUser", () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => UserRepository.removeAll())

    it("registers a new user", () => {
        return registerUser("Peter Pan", "peterpan@mail.com", "peterpan", "123123123")
            .then(result => {
                //expect(result).not.to.exist
                expect(result).to.be.undefined

                return UserRepository.findByUsername("peterpan")
            })
            .then(user => {
                //expect(user).to.exist
                expect(user).not.to.be.null

                if (user) {
                    expect(user.name).to.equal("Peter Pan")
                    expect(user.email).to.equal("peterpan@mail.com")
                    expect(user.username).to.equal("peterpan")
                    expect(user.password).to.equal("123123123")
                }
            })
    })

    it("fails on existing user", () => {
        let errorThrown: Error

        return UserRepository.save({ id: "012345678901234567890123", name: "Wendy Darling", email: "wendydarling@mail.com", username: "wendydarling", password: "123123123" })
            .then(() => registerUser("Wendy Darling", "wendydarling@mail.com", "wendydarling", "123123123"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal("user already exists")
            })
    })

    it("fails on invalid name type", () => {
        let errorThrown: Error

        try {
            /* @ts-ignore */
            registerUser(undefined, "campa@nilla.com", "campanilla", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid name type")
        }
    })

    it("fails on invalid name min length", () => {
        let errorThrown: Error

        try {
            registerUser("", "campa@nilla.com", "campanilla", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid name min length")
        }
    })

    it("fails on invalid name max length", () => {
        let errorThrown: Error

        try {
            registerUser("01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890", "campa@nilla.com", "campanilla", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid name max length")
        }
    })

    it("fails on invalid email type", () => {
        let errorThrown: Error

        try {
            /* @ts-ignore */
            registerUser("Campa Nilla", undefined, "campanilla", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid email type")
        }
    })

    it("fails on invalid email min length", () => {
        let errorThrown: Error

        try {
            registerUser("Campa Nilla", "", "campanilla", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid email min length")
        }
    })

    it("fails on invalid email max length", () => {
        let errorThrown: Error

        try {
            registerUser("Campa Nilla", "campa0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789@nilla.com", "campanilla", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid email max length")
        }
    })

    it("fails on invalid email format", () => {
        let errorThrown: Error

        try {
            registerUser("Campa Nilla", "campa$nilla.com", "campanilla", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid email format")
        }
    })

    it("fails on invalid username type", () => {
        let errorThrown: Error

        try {
            /* @ts-ignore */
            registerUser("Campa Nilla", "campa@nilla.com", undefined, "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid username type")
        }
    })

    it("fails on invalid username min length", () => {
        let errorThrown: Error

        try {
            registerUser("Campa Nilla", "campa@nilla.com", "", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid username min length")
        }
    })

    it("fails on invalid username max length", () => {
        let errorThrown: Error

        try {
            registerUser("Campa Nilla", "campa@nilla.com", "0123456789012345678901234567890", "123123123")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid username max length")
        }
    })

    it("fails on invalid password type", () => {
        let errorThrown: Error

        try {
            /* @ts-ignore */
            registerUser("Campa Nilla", "campa@nilla.com", "campanilla", undefined)
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid password type")
        }
    })

    it("fails on invalid password min length", () => {
        let errorThrown: Error

        try {
            registerUser("Campa Nilla", "campa@nilla.com", "campanilla", "")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid password min length")
        }
    })

    it("fails on invalid password max length", () => {
        let errorThrown: Error

        try {
            registerUser("Campa Nilla", "campa@nilla.com", "campanilla", "01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890")
        } catch (error) {
            errorThrown = error as Error
        } finally {
            expect(errorThrown!).to.be.instanceOf(ValidationError)
            expect(errorThrown!.message).to.equal("invalid password max length")
        }
    })

    afterEach(() => UserRepository.removeAll())

    after(() => disconnect())
})