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
    return registerUser("Maxi Bom", "maxi@bom.com", "maxi", "123456789")
      .then(() => User.findOne({ username: "maxi" }).lean())
      .then((user) => {
        expect(user).to.exist;

        if (user) {
          expect(user.name).to.equal("Maxi Bom");
          expect(user.email).to.equal("maxi@bom.com");
          expect(user.username).to.equal("maxi");
          expect(user.password).to.equal("123456789");
        }
      });
  });

  it("fails on existing user", () => {
    let errorThrown: Error;

    return User.create({
      name: "Cu Pon",
      email: "cu@pon.com",
      username: "cupon",
      password: "123456789",
    })
      .then(() => registerUser("Cu Pon", "cu@pon.com", "cupon", "123456789"))
      .catch((error) => (errorThrown = error))
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(Error);
        expect(errorThrown.message).to.equal("User already exists");
      });
  });

  afterEach(() => User.deleteMany());

  after(() => disconnect());
});
