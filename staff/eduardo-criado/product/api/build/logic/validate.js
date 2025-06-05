import { ValidationError } from "./errors.js";
const ID_REGEX = /^[0-9a-z]+$/;
function validateId(id, explain = "id") {
    if (typeof id !== "string") {
        throw new ValidationError(`invalid ${explain} type`);
    }
    if (!ID_REGEX.test(id)) {
        throw new ValidationError(`invalid ${explain} format`);
    }
}
const validate = {
    id: validateId,
};
export default validate;
//# sourceMappingURL=validate.js.map