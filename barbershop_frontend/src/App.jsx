import { useState } from 'react'
import {Link, Routes, Route } from "react-router"
import './App.css'
import SocialMedia from './pages/SocialMedia.jsx'
import Appointment from './pages/Appointment.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Start from './pages/Start.jsx'

function App() {
  const [authToken, setAuthToken] = useState("")  

  return (

    <>
    <div id="navigationalLinks">
      <Link to={"/home"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/appointments"}>Appointments</Link>
      <Link className="linkAnchor" to={"/reviews"}>Reviews</Link>
    </div>   
    
      <Routes>
        <Route path="/" element={<Start />}/> 
        <Route path="/home" element={<Home />}/>          
        <Route path="/about" element={<About />} />
        <Route path="/appointments" element={<Appointment
                    authToken={authToken}
                    setAuthToken={setAuthToken}
        />} />
        <Route path="/reviews" element={<SocialMedia />} />      
      </Routes>     
    </>
    
  )
}

export default App
