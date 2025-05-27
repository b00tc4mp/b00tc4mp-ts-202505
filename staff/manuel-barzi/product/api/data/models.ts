import { Schema, model } from "mongoose"
import { IUserDoc } from "./types"


const user = new Schema<IUserDoc>({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

export const User = model("User", user)
