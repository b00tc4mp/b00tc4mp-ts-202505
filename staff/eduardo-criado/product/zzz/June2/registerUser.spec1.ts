import { expect } from "chai";
import { registerUser } from "./registerUser.js";
import { connect, disconnect, User } from "../data/index.js";

const { MONGO_URL_TEST = "mongodb://localhost:27017/product-api-test" } =
  process.env;

debugger;
console.log(MONGO_URL_TEST);

describe("registerUser", () => {
  before(() => connect(MONGO_URL_TEST));

  beforeEach(() => User.deleteMany());

  it("registers a new user", () => {
    expect(true).to.be.true;
  });

  afterEach(() => User.deleteMany());

  after(() => disconnect());
});
