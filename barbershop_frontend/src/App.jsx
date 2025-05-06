import { useState } from 'react'
import {Link, Routes, Route, BrowserRouter } from "react-router"
import './App.css'
import SocialMedia from './pages/socialMedia'
import Appointment from './pages/appointment'
import About from './pages/about'
import Home from './pages/home'

function App() {
  const [authToken, setAuthToken] = useState("")
  

  return (
    <>
    <div id="navigationalLinks">
      <Link to={"/home"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/appointments"}>Appointments</Link>
      <Link to={"/socialMedia"}>SocialMedia</Link>
    </div>
   
    
      <Routes>
        <Route path="/home" element={<Home />}/>          
        <Route path="/about" element={<About />} />
        <Route path="/appointments" element={<Appointment
                    authToken={authToken}
                    setAuthToken={setAuthToken}
        />} />
        <Route path="/socialMedia" element={<SocialMedia />} />      
      </Routes>
    
    
      
    </>
  )
}

export default App
