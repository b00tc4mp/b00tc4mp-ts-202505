// import { useState } from 'react'
// import Register from './views/components/Register'
// import logic from './logic'
// import './App.css'
// import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
// import Login from './views/components/Login'


// function App() {
//   const [message, setMessage] = useState(null)

//   const navigate = useNavigate()

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   const handleRegisterClick = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="App">
//       <h1>Product App</h1>
//       <p>{message}</p>
//       <button onClick={handleLoginClick}>Login</button>
//       <button onClick={handleRegisterClick}>Register</button>
//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </div>
//   )

 

 
// }

// export default App

/*
import { useState } from 'react'
import Register from './views/components/Register'
import Login from './views/components/Login'
import { useNavigate, Routes, Route } from 'react-router-dom'

function Home({ 
  onLogin = () => alert('Default login'), 
  onRegister = () => alert('Default register'), 
  message = "Bienvenido" 
}) {
  return (
    <div>
      <h1>Product App</h1>
      <p>{message}</p>
      <button onClick={onLogin}>Login</button>
      <button onClick={onRegister}>Register</button>
    </div>
  )
}

function App() {
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate("/login")
    setMessage("You clicked the login button")
  }
  const handleRegisterClick = () => {
    navigate("/register")
    setMessage("You clicked the register button")
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            onLogin={handleLoginClick}
            onRegister={handleRegisterClick}
            message={message}
          />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
*/

import { useState } from 'react'
import Register from './views/components/Register'
import Login from './views/components/Login'
import Home from './views/components/Home'
import { useNavigate, Routes, Route } from 'react-router-dom'

function App() {
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate("/login")
    setMessage("You clicked the login button")
  }
  const handleRegisterClick = () => {
    navigate("/register")
    setMessage("You clicked the register button")
  }

  const handleGoToHome = () => {
    navigate('/')
    setMessage("You clicked the home button")
  }


  return (
    <div className="App">
      <h1>Product App</h1>
      <p>{message}</p>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
      <button onClick={handleGoToHome}>Home</button>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
export default App
