import { Schema, model } from "mongoose";
export const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        // required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// const User = model<IUserDoc>("User", user);
export const User = model("User", user);
// User.create({
//   name: "Edu",
//   email: "edu@example.com",
//   avatar: "https://robohash.org/1",
//   username: "edu",
//   password: "123456",
// });
// User.findOne();
// export default User;
//# sourceMappingURL=models.js.map