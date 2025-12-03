import { Schema, model, connect, disconnect } from "mongoose";
const { ObjectId } = Schema.Types;
const user = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 100,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
    avatar: {
        type: String,
    },
});
const User = model("User", user);
const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 300,
    },
    image: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
const Post = model("Post", post);
export { connect, disconnect, User, Post };
//# sourceMappingURL=index.js.map