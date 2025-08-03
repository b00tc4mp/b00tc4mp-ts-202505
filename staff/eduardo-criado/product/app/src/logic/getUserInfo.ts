import errors, { SystemError } from "./errors";

const getUserInfo = (userId: string) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return Promise.reject(new SystemError("User is not authenticated"));
  }

  return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response
          .json()
          .catch(() => {
            throw new SystemError("Server is not available");
          })
          .then((body) => {
            const { error, message } = body;
            const Constructor = errors[error as keyof typeof errors];
            if (typeof Constructor === "function") {
              throw new (Constructor as typeof SystemError)(message);
            } else {
              throw new Error(message);
            }
          });
      }
    })
    .catch((error) => {
      if (error instanceof Error) throw error;
      else throw new SystemError("Unknown error");
    });
};

export default getUserInfo;
