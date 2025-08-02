import errors, { SystemError } from "./errors";

const loginUser = (username: string, password: string) => {
  return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .catch((error) => {
      throw new Error(error);
    })
    .then((response) => {
      if (response.status === 200)
        return response
          .json()
          .catch(() => {
            throw new SystemError("server is not available");
          })
          .then((token) => (sessionStorage.token = token));

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

export default loginUser;
