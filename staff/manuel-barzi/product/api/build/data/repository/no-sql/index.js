import { Schema, model, connect, disconnect, Types } from "mongoose";
const { ObjectId } = Types;
const user = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 100
    },
    avatar: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    }
});
const User = model("User", user);
export { connect, disconnect, ObjectId, User };
//# sourceMappingURL=index.js.map