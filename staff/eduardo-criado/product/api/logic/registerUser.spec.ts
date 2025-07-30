import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { registerUser } from "./registerUser.js";
import { DuplicityError, ValidationError } from "./errors.js";
import { UserRepository } from "../data/repository/sql/UserRepository.js";

const { MONGO_URL = "mongodb://localhost:27017/product-api-test" } =
  process.env;

describe("registerUser", () => {
  before(() => connect(MONGO_URL));

  beforeEach(() => UserRepository.removeAll());

  it("registers a new user", () => {
    return registerUser(
      "Peter Pan",
      "peterpan@mail.com",
      "peterpan",
      "123123123"
    )
      .then((result) => {
        //expect(result).not.to.exist
        expect(result).to.be.undefined;

        return UserRepository.findByUsername("peterpan");
      })
      .then((user) => {
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
    let errorThrown: Error;

    return UserRepository.save({
      id: "68505d6ee96dfc66eb4a9fe9",
      name: "Wendy Darling",
      email: "wendydarling@mail.com",
      username: "wendydarling",
      password: "123123123",
    })
      .then(() =>
        registerUser(
          "Wendy Darling",
          "wendydarling@mail.com",
          "wendydarling",
          "123123123"
        )
      )
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(DuplicityError);
        expect(errorThrown.message).to.equal("user already exists");
      });
  });

  it("fails on invalid name type", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      registerUser(undefined, "campo@amor.com", "campoamor", "123123123");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid name type");
    }
  });

  it("fails on invalid name min length", () => {
    let errorThrown: Error;

    try {
      registerUser("", "campo@amor.com", "campoamor", "123123123");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid name min length");
    }
  });

  it("fails on invalid name max length", () => {
    let errorThrown: Error;

    try {
      registerUser(
        "01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "campo@amor.com",
        "campoamor",
        "123123123"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid name max length");
    }
  });

  it("fails on invalid email type", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      registerUser("Campo Amor", undefined, "campoamor", "123123123");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid email type");
    }
  });

  it("fails on invalid email min length", () => {
    let errorThrown: Error;

    try {
      registerUser("Campo Amor", "", "campoamor", "123123123");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid email min length");
    }
  });

  it("fails on invalid email max length", () => {
    let errorThrown: Error;

    try {
      registerUser(
        "Campo Amor",
        "campo0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789@amor.com",
        "campoamor",
        "123123123"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid email max length");
    }
  });

  it("fails on invalid email format", () => {
    let errorThrown: Error;

    try {
      registerUser("Campo Amor", "campo$amor.com", "campoamor", "123123123");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid email format");
    }
  });

  it("fails on invalid username type", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      registerUser("Campo Amor", "campo@amor.com", undefined, "123123123");
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
      registerUser("Campo Amor", "campo@amor.com", "", "123123123");
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
      registerUser(
        "Campo Amor",
        "campo@amor.com",
        "0123456789012345678901234567890",
        "123123123"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid username max length");
    }
  });

  it("fails on invalid password type", () => {
    let errorThrown: Error;

    try {
      /* @ts-ignore */
      registerUser("Campo Amor", "campo@amor.com", "campoamor", undefined);
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid password type");
    }
  });

  it("fails on invalid password min length", () => {
    let errorThrown: Error;

    try {
      registerUser("Campo Amor", "campo@amor.com", "campoamor", "");
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid password min length");
    }
  });

  it("fails on invalid password max length", () => {
    let errorThrown: Error;

    try {
      registerUser(
        "Campo Amor",
        "campo@amor.com",
        "campoamor",
        "01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
      );
    } catch (error) {
      errorThrown = error as Error;
    } finally {
      expect(errorThrown!).to.be.instanceOf(ValidationError);
      expect(errorThrown!.message).to.equal("invalid password max length");
    }
  });

  afterEach(() => UserRepository.removeAll());

  after(() => disconnect());
});
