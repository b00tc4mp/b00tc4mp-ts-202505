import { expect } from "chai";
import { connect, disconnect } from "../data/repository/no-sql/index.js";
import { generateCaption } from "./generateCaption.js";

import { UserRepository } from "../data/repository/sql/UserRepository.js";

import { Types } from "mongoose";
import { beforeEach } from "mocha";

const {
  MONGO_URL = "mongodb://localhost:27017/product-api-test",
  PORT = 8081,
} = process.env;

const { ObjectId } = Types;

describe.skip("generateCaption", function () {
  this.timeout(10000);
  before(() => connect(MONGO_URL));

  beforeEach(() => UserRepository.removeAll());

  it("generates a caption for an existing user", () => {
    return UserRepository.save({
      id: "68505d6ee96dfc66eb4a9fe7",
      name: "Manolo Flores",
      email: "mfloresg@mail.com",
      username: "maflores",
      password: "123123123",
    })
      .then((user) => {
        // console.log(user);
        return generateCaption("68505d6ee96dfc66eb4a9fe7", [
          "mariposas",
          "flor",
          "marisma",
          "primavera",
        ]);
      }) // equal to ._id.toString()
      .then((caption) => {
        console.log("Caption result:", caption);

        expect(caption.toLocaleLowerCase()).to.contains("mariposas");
        expect(caption).to.contains("flor");
        expect(caption).to.contains("marisma");
        expect(caption).to.contains("primavera");
      });
  });
  afterEach(() => UserRepository.removeAll());

  after(() => disconnect());
});
