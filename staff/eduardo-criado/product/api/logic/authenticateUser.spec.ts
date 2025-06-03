import { expect } from "chai";
import { connect, disconnect, User } from "../data/index.js";
import { authenticateUser } from "./authenticateUser.js";
import { CredentialsError } from "./errors.js";

const { MONGO_URL_TEST = "mongodb://localhost:27017/b00tc4mp-ts-202505-test" } =
  process.env;

describe("authenticateUser", () => {
  before(() => connect(MONGO_URL_TEST));

  beforeEach(() => User.deleteMany());

  it("authenticates a user", () => {
    let userIdCreated: string;

    return User.create({
      name: "Eduardo",
      email: "edu@mail.com",
      avatar: "http://image.com/edu",
      username: "edu",
      password: "123123123",
    })
      .then((user) => (userIdCreated = user._id.toString()))
      .then(() => authenticateUser("edu", "123123123"))
      .then((userId) => {
        expect(userId).to.equal(userIdCreated);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  });

  it("fails on invalid credentials", () => {
    let errorThrown: Error;

    return User.create({
      name: "Eduardo",
      email: "edu@mail.com",
      avatar: "http://image.com/edu",
      username: "edu",
      password: "123123123",
    })
      .then(() => authenticateUser("edu", "wrongpassword"))

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
