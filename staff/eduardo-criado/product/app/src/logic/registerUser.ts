import errors, { SystemError } from "./errors";

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
    .catch((error) => {
      throw new SystemError("server error: " + error);
    })
    .then((response) => {
      if (response.status === 201) return;
      return response
        .json()
        .catch(() => {
          throw new SystemError("server is not available");
        })
        .then((body) => {
          const { error, message } = body;
          const constructor = errors[error as keyof typeof errors];
          if (typeof constructor === "function") {
            throw new (constructor as typeof SystemError)(message);
          } else {
            throw new Error(message);
          }
        });
    });
};

export default registerUser;
