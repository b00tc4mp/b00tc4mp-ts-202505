import { useNavigate } from "react-router-dom";
import logic from "../../logic";
import { useState } from "react";
// import { useEffect, useState } from "react";


function Home( ) {
    
    const navigate = useNavigate()

    const [message, setMessage] = useState("")


    const handleLogout = () => {
        logic.logoutUser()
        setMessage("You clicked the logout button")
        navigate("/login")
    }

    return (
        <div>
            <h1>Product App</h1>
            <p>{message}</p>
            {/* <button onClick={onLogin}>Login</button>
            <button onClick={onRegister}>Register</button> */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home



    