import errors, { SystemError } from "com/errors";

const registerUser = (
  name: string,
  email: string,
  username: string,
  password: string
) => {
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
