import { connect, disconnect } from "mongoose";
import { User } from "./models.js";
// import { IUserDoc } from "./types"
try {
    await connect("mongodb://localhost:27017/product-api");
    // try {
    //     await User.deleteMany()
    // } catch (error) {
    //     throw new Error(error.message)
    // }
    // try {
    //     await User.create({ name: "Edu", email: "edu@mail.com", avatar: "http://image.com/edu", username: "edu", password: "123123123" })
    // } catch (error) {
    //     throw new Error(error.message)
    // }
    // try {
    //   const user = new User({
    //     name: "Paco",
    //     email: "paco@mail.com",
    //     avatar: "http://image.com/paco",
    //     username: "paco",
    //     password: "123123123",
    //   });
    //   await user.save();
    // } catch (error) {
    //   throw new Error(error.message);
    // }
    // console.log("user created");
    let user;
    try {
        user = await User.findById("683d99477fa247cb7d7ca712").lean();
    }
    catch (error) {
        throw new Error(error.message);
    }
    if (!user)
        throw new Error("user not found");
    console.log(user);
    console.log(user.name);
}
catch (error) {
    console.error(error);
}
finally {
    await disconnect();
}
//# sourceMappingURL=populate.js.map