import { useState } from 'react'
import Register from './views/components/Register'
import logic from './logic'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'


function App() {
  // const [message, setMessage] = useState(null)

  // const navigate = useNavigate()

  return (
    <>
       <div className="App">
      <Register />
      </div>
    </>
    //   <BrowserRouter>
    //   <Routes>
    //     <Route path="/register" element={<Register />} />
    //     {/* <Route path="/login" element={<Login />} /> */}
    //     {/* <Route path="/" element={<Home />} /> */}
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
