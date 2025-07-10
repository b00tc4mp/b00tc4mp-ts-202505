import { ValidationError } from "./errors.js"

const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const ID_REGEX = /^[a-z0-9]+$/i

const text = (text: string, explain = "text", min = 1, max = Infinity) => {
    if (typeof text !== "string") throw new ValidationError(`invalid ${explain} type`)

    if (text.length < min) throw new ValidationError(`invalid ${explain} min length`)

    if (text.length > max) throw new ValidationError(`invalid ${explain} max length`)
}

const email = (email: string, explain = "email", max = Infinity) => {
    text(email, explain, 6, max)

    if (!EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} format`)
}

const id = (id: string, explain = "id") => {
    if (typeof id !== "string") throw new ValidationError(`invalid ${explain} type`)

    if (!ID_REGEX.test(id)) throw new ValidationError(`invalid ${explain} format`)
}

export const validate = {
    text,
    email,
    id
}