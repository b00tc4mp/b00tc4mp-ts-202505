import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logic from "../../logic";
import { SystemError } from "../../logic/errors";

const Register = () => {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegisterSubmit = (event : FormEvent) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const name = form.name.value;
        const email = form.email.value;
        const username = form.username.value;
        const password = form.password.value;

        try {
            logic.registerUser(name, email, username, password)
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

                    setMessage(error.message);
            }
        );
        } catch (error) {
            if (error instanceof SystemError) {
                setMessage(error.message);
            }
        }

        const handleLoginClick = () => {
            event.preventDefault();
            navigate("/login");
        };

        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={handleRegisterSubmit}>
                    <input type="text" name="name" placeholder="Name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
                <p>{message}</p>
                <button onClick={handleLoginClick}>Login</button>
            </div>
        );
    };



        