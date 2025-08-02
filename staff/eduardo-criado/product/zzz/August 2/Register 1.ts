import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar usuario en localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, username, password })
    );
    navigate("/login");
  };

  return React.createElement(
    "form",
    { onSubmit: handleSubmit },
    React.createElement("input", {
      type: "text",
      placeholder: "Name",
      onChange: (e) => setName(e.target.value),
    }),
    React.createElement("input", {
      type: "email",
      placeholder: "Email",
      onChange: (e) => setEmail(e.target.value),
    }),
    React.createElement("input", {
      type: "text",
      placeholder: "Username",
      onChange: (e) => setUsername(e.target.value),
    }),
    React.createElement("input", {
      type: "password",
      placeholder: "Password",
      onChange: (e) => setPassword(e.target.value),
    }),
    React.createElement("button", { type: "submit" }, "Register")
  );
}
