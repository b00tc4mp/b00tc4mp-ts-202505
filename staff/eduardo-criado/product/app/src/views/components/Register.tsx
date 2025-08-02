import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logic from "../../logic";
import { SystemError } from "../../logic/errors";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    try {
      logic
        .registerUser(name, email, username, password)
        .then(() => {
          setMessage("Registration successful");
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);

          if (error instanceof SystemError) {
            alert(error.message);
            return;
          }
          if (error instanceof Error) {
        setMessage(error.message);
          } else {
        setMessage("Registration failed");
          }
      });
    } catch (error) {
      setMessage("error registering user" + error);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
      <>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
        <button onClick={handleLoginClick}>Login</button>
      </div>
      </>
    );
}
