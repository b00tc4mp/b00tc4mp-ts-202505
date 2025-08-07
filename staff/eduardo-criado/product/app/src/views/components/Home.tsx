import { useNavigate } from "react-router-dom";
import logic from "../../logic";
import { useEffect, useState, type FormEvent } from "react";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

function Home() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [name, setName] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    try {
      logic
        .getUserInfo()
        .then((user) => {
          setName(user.name);
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }, []);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formElements = form.elements as typeof form.elements & {
      query: HTMLInputElement;
      sortField: HTMLSelectElement;
      sortOrder: HTMLSelectElement;
      pageNumber: HTMLInputElement;
      pageSize: HTMLInputElement;
    };

    const {
      query: { value: query },
      sortField: { value: sortField },
      sortOrder: { value: sortOrder },
      pageNumber: { value: pageNumber },
      pageSize: { value: pageSize },
    } = formElements;

    try {
      logic
        .searchUsers(
          query,
          sortField,
          sortOrder,
          parseInt(pageNumber),
          parseInt(pageSize)
        )
        .then((users) => {
          setUsers(users);
          setMessage(
            users.length > 0 ? "Search successful" : "No results found"
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
      alert(error);
    }

    // navigate(
    //   `/search?query=${query}&sortField=${sortField}&sortOrder=${sortOrder}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    // );
  };

  const handleLogout = () => {
    logic.logoutUser();
    setMessage("You clicked the logout button");
    navigate("/login");
  };

  return (
    <div>
      <p>{message}</p>
      <p>{name ? `Welcome ${name}!` : "Loading user..."}</p>

      <form onSubmit={handleSearchSubmit}>
        <input type="text" name="query" placeholder="Search query" />

        <select name="sortField" defaultValue="name">
          <option value="name">Nombre</option>
          <option value="username">Usuario</option>
          <option value="email">Correo</option>
        </select>

        <select name="sortOrder" defaultValue="asc">
          <option value="asc">↑ Ascendente</option>
          <option value="desc">↓ Descendente</option>
        </select>

        <input
          type="number"
          name="pageNumber"
          placeholder="Page number"
          defaultValue="1"
          min="1"
        />
        <input
          type="number"
          name="pageSize"
          placeholder="Page size"
          defaultValue="10"
          min="1"
        />

        <button type="submit">Search</button>
      </form>

      <button onClick={handleLogout}>Logout</button>

      {/* Tabla para mostrar los usuarios */}
      <div>
        <h3>Users found:</h3>
        {users.length === 0 ? (
          <p>No users to display.</p>
        ) : (
          <table border={1} cellPadding={10}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Home;

//   return (
//     <div>
//       <p>{message}</p>
//       <p>{name ? `Welcome ${name}!` : "loading user..."}</p>

//       <div>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search query"
//         />

//         <select
//           value={sortField}
//           onChange={(e) => setSortField(e.target.value)}
//         >
//           <option value="name">Nombre</option>
//           <option value="username">Usuario</option>
//           <option value="email">Correo</option>
//         </select>
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="asc">↑ Ascendente</option>
//           <option value="desc">↓ Descendente</option>
//         </select>
//       </div>

//       <div>
//         <input
//           type="number"
//           value={pageNumber}
//           onChange={(e) => setPageNumber(e.target.value)}
//           placeholder="Page number"
//         />
//         <input
//           type="number"
//           value={pageSize}
//           onChange={(e) => setPageSize(e.target.value)}
//           placeholder="Page size"
//         />
//       </div>

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }
