import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logic from "../../logic";
import { SystemError } from "../../../../com/errors";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage("");

        try {
            logic.loginUser(username, password)
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

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        );
}

export default Login
