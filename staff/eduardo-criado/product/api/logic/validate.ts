import { ValidationError } from "./errors.js";

const ID_REGEX = /^[a-z0-9]+$/i;

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function validateId(id: string, explain = "id") {
  if (typeof id !== "string") {
    throw new ValidationError(`invalid ${explain} type`);
  }

  if (!ID_REGEX.test(id)) {
    throw new ValidationError(`invalid ${explain} format`);
  }
}

function ValidateText(text: string, explain = "text", min = 1, max = Infinity) {
  if (typeof text !== "string")
    throw new ValidationError(`invalid ${explain} type`);

  if (text.length < min)
    throw new ValidationError(`invalid ${explain} min length`);

  if (text.length > max)
    throw new ValidationError(`invalid ${explain} max length`);
}

function validateEmail(email: string, explain = "email", max = Infinity) {
  ValidateText(email, explain, 6, max);

  if (!EMAIL_REGEX.test(email))
    throw new ValidationError(`invalid ${explain} format`);
}

export const validate = {
  id: validateId,
  text: ValidateText,
  email: validateEmail,
};

// export default validate;
