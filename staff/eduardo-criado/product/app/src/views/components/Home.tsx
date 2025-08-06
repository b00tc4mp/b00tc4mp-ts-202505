import { useNavigate } from "react-router-dom";
import logic from "../../logic";
import { useEffect, useState } from "react";


function Home( ) {
    
    const navigate = useNavigate()

    const [message, setMessage] = useState("")

    const [name, setName] = useState("")


    const handleLogout = () => {
        logic.logoutUser()
        setMessage("You clicked the logout button")
        navigate("/login")
    }

    useEffect(() => {
        try {

            logic.getUserInfo()
                .then(user => {
                    setName(user.name)
                })
                .catch(error  =>  {
                    alert(error.message)
                })
        } catch (error) {
            console.error(error)
            alert(error)
        }
            
    }, [])

    return (
        <div>
            <p>{message}</p>
            <p>{name? `Welcome ${name}!` : "loading user..."}</p>
            
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home



    