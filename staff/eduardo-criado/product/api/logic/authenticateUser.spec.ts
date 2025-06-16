import { expect } from "chai";
import { connect, disconnect } from "../data/repository/mongo/index.js";
import { authenticateUser } from "./authenticateUser.js";
import { NotFoundError, PasswordError, ValidationError } from "./errors.js";
import { UserRepository } from "../data/repository/fs/UserRepository.js";

const { MONGO_URL_TEST = "mongodb://localhost:27017/product-api-test" } =
  process.env;

describe("authenticateUser", () => {
  before(() => connect(MONGO_URL_TEST));

  beforeEach(() => UserRepository.removeAll());

  it("authenticates on existing user", () => {
    return (
      UserRepository.save({
        id: "68505d6ee96dfc66eb4a9fe9",
        name: "Wendy Darling",
        email: "wendydarling@mail.com",
        username: "wendydarling",
        password: "123123123",
      })
        // .then((user) => (existingUserId = user.id)) // equal to ._id.toString()
        .then(() => authenticateUser("wendydarling", "123123123"))
        .then((userId) => expect(userId).to.equal("68505d6ee96dfc66eb4a9fe9"))
    );
  });

  it("fails on non-existing username", () => {
    let errorThrown: Error;

    return authenticateUser("wendydarling", "123123123")
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError);
        expect(errorThrown.message).to.equal("user not found");
      });
  });

  it("fails on invalid username type", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      authenticateUser(undefined, "123123123");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid username type");
    }
  });

  it("fails on invalid username min length", () => {
    let errorThrown: Error;

    try {
      authenticateUser("", "123123123");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid username min length");
    }
  });

  it("fails on invalid username max length", () => {
    let errorThrown: Error;

    try {
      authenticateUser("0123456789012345678901234567890", "123123123");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid username max length");
    }
  });

  it("fails on invalid  password type", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      authenticateUser("wendydarling", undefined);
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid password type");
    }
  });

  it("fails on invalid  password min length", () => {
    let errorThrown: Error;

    try {
      authenticateUser("wendydarling", "");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid password min length");
    }
  });

  it("fails on invalid  password max length", () => {
    let errorThrown: Error;

    try {
      authenticateUser(
        "wendydarling",
        "01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid password max length");
    }
  });

  it("fails on existing username but wrong password", () => {
    let errorThrown: Error;

    return UserRepository.save({
      id: "68505d6ee96dfc66eb4a9fe9",
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

  it("fails on existing password but wrong username", () => {
    let errorThrown: Error;

    return UserRepository.save({
      id: "68505d6ee96dfc66eb4a9fe9",
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

  afterEach(() => UserRepository.removeAll());

  after(() => disconnect());
});
