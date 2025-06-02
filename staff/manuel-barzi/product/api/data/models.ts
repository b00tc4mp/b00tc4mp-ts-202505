import { Schema, model } from "mongoose"
import { IUserDoc } from "./types.js"


const user = new Schema<IUserDoc>({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    avatar: {
        type: String
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

export const User = model("User", user)
