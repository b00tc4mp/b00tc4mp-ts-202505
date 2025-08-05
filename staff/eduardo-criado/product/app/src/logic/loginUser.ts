import errors, { SystemError } from "com/errors";

const loginUser = (username: string, password: string) => {
  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .catch(() => {
      throw new SystemError("server connection error");
    })
    .then((response) => {
      if (response.ok)
        return response
          .json()
          .catch(() => {
            throw new SystemError("json parse error");
          })
          .then((token) => (sessionStorage.token = token));

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

export default loginUser;
