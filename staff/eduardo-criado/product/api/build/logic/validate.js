import { ValidationError } from "./errors.js";
const ID_REGEX = /^[a-z0-9]+$/i;
const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
function validateId(id, explain = "id") {
    if (typeof id !== "string") {
        throw new ValidationError(`invalid ${explain} type`);
    }
    // if (typeof id !== "string" || !id.length)
    //   throw new ValidationError("invalid ${explain} format");
    if (!ID_REGEX.test(id)) {
        throw new ValidationError(`invalid ${explain} format`);
    }
    // if (typeof id !== "string" || !id.trim()) {
    //   throw new ValidationError(`invalid ${explain} format`);
    // }
}
function validateText(text, explain = "text", min = 1, max = Infinity) {
    if (typeof text !== "string")
        throw new ValidationError(`invalid ${explain} type`);
    if (text.length < min)
        throw new ValidationError(`invalid ${explain} min length`);
    if (text.length > max)
        throw new ValidationError(`invalid ${explain} max length`);
}
function validateEmail(email, explain = "email", max = Infinity) {
    validateText(email, explain, 6, max);
    if (!EMAIL_REGEX.test(email))
        throw new ValidationError(`invalid ${explain} format`);
}
// function validateKeyWords(keyWords: string[], explain = "key words") {
//   keyWords.forEach((keyWord) => validateText(keyWord, explain));
// }
function validateKeyWords(keyWords, explain = "key words") {
    if (!Array.isArray(keyWords)) {
        throw new ValidationError(`invalid ${explain} type`);
    }
    if (keyWords.length === 0) {
        throw new ValidationError(`no ${explain} provided`);
    }
    keyWords.forEach((keyWord) => validateText(keyWord, explain));
}
export const validate = {
    id: validateId,
    text: validateText,
    email: validateEmail,
    keyWords: validateKeyWords,
};
// export default validate;
//# sourceMappingURL=validate.js.map