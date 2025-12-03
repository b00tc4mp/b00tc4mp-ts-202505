import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import logic from "../../logic";
import { SystemError } from "com";

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const form = event.currentTarget;

    const formElements = form.elements as typeof form.elements & {
      username: HTMLInputElement;
      password: HTMLInputElement;
    };

    const {
      username: { value: username },
      password: { value: password },
    } = formElements;

    try {
      logic
        .loginUser(username, password)
        .then(() => {
          setMessage("Login successful");
          navigate("/");
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
            setMessage("Login failed");
          }
        });
    } catch (error) {
      setMessage("error logging in user" + error);
    }
  };

  // const handleRegisterClick = () => {
  //     navigate("/register")
  //     setMessage("You clicked the register button")
  // }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input type="text" placeholder="Username" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}

      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
