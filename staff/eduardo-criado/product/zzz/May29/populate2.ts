import { connect, disconnect } from "mongoose";
import { User } from "./models";
import { IUserDoc } from "./types";

connect("mongodb://localhost:27017/product-api")
  .then(() => console.log("connected"))
  // .then(() => User.deleteMany())

  // .then(() => {
  //     // return User.deleteMany()
  //     //     .catch(error => { throw new Error(error.message) })
  // })
  //   .then(() => {
  //     return User.create({
  //       name: "Manu",
  //       email: "manu@example.com",
  //       avatar: "https://i.pravatar.cc/150?u=manu",
  //       username: "manu",
  //       password: "123456",
  //     })
  //       .catch((error) => {
  //         throw new Error(error.message);
  //       })
  //       .then(() => {
  //         console.log("user created");
  //       });
  //   })
  //   .catch((error) => {
  //     console.error(error.message);
  //   })

  //     const user = new User({
  //       name: "Peddro",
  //       email: "pedro@mail.com",
  //       avatar: "http://image.com/pedro",
  //       username: "pedro",
  //       password: "123456",
  //     });

  //     return user
  //       .save()
  //       .catch((error) => {
  //         throw new Error(error.message);
  //       })
  //       .then(() => console.log("user created"));
  //   })

  .then(() => {
    return User.findById("6838067164650019048b36fe")
      .lean()
      .catch((error) => {
        throw new Error(error.message);
      })
      .then((user) => {
        if (!user) throw new Error("user not found");

        console.log(user);
        console.log(user.name);
      });
  })

  .finally(() => {
    disconnect();
  });
