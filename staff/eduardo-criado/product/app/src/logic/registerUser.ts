import { validate } from "com";
import errors, { SystemError } from "com/errors";

const registerUser = (
  name: string,
  email: string,
  username: string,
  password: string
) => {
  validate.text(name, "name", 1, 100);
  validate.email(email, "email", 100);
  validate.text(username, "username", 3, 30);
  validate.text(password, "password", 8, 100);

  return fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, username, password }),
  })
    .catch(() => {
      throw new SystemError("server connection error");
    })
    .then((response) => {
      if (response.status === 201) return;

      return response
        .json()
        .catch(() => {
          throw new SystemError("json parse error");
        })
        .then((body) => {
          const { error, message } = body;
          const constructor = errors[error as keyof typeof errors];

          throw new constructor(message);
        });
    });
};

export default registerUser;
