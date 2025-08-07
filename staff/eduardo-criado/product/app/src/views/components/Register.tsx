import React, { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import logic from "../../logic";
import { SystemError } from "../../../../com/errors";

export default function Register() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const form = event.currentTarget

    const formElements = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      username: HTMLInputElement;
      password: HTMLInputElement;
      
    };

  const { name: { value: name}, email: { value: email}, username: { value: username}, password: { value: password }} = formElements

    try {
      logic
        .registerUser(
          name,
          email,
          username, 
          password)
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
    setMessage("You clicked the login button");
  };

  return (
      <>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            placeholder="Name"
            id = "name"
          />
          <input
            type="email"
            placeholder="Email"
            id = "email"
          />
          <input
            type="text"
            placeholder="Username"
            id = "username"
          />
          <input
            type="password"
            placeholder="Password"
            id = "password"
          />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
        <Link to = "/login" onClick={handleLoginClick}>Login</Link>
      </div>
      </>
    );
}
