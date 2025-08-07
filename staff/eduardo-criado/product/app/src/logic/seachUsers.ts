import { validate } from "com";
import errors, { SystemError } from "com/errors";

const searchUsers = (
  query: string,
  sortField: string,
  sortOrder: string,
  pageNumber: number,
  pageSize: number
) => {
  validate.text(query, "query", 1, 100);
  validate.text(sortField, "sort field", 1, 100);
  validate.text(sortOrder, "sort order", 1, 100);
  validate.number(pageNumber, "page number");
  validate.number(pageSize, "page size");

  const token = sessionStorage.getItem("token");

  const params = new URLSearchParams({
    query,
    sortField,
    sortOrder,
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  return fetch(
    `${import.meta.env.VITE_API_URL}/users/search?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
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

export default searchUsers;
