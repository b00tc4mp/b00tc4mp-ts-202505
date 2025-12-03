import errors, { SystemError } from "com/errors";

const getUserInfo = () => {
  const token = sessionStorage.getItem("token");

  return fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .catch(() => {
      throw new SystemError("server connection error");
    })
    .then((response) => {
      if (response.ok)
        return response.json().catch(() => {
          throw new SystemError("json parse error");
        });

      return response
        .json()
        .catch(() => {
          throw new SystemError("json parse error");
        })
        .then((body) => {
          const { error, message } = body;

          const Constructor = errors[error as keyof typeof errors];

          throw new Constructor(message);
        });
    });
};

export default getUserInfo;
