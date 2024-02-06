import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from './components/login'
import 'tailwindcss/tailwind.css';
import Register from './components/register'
import HomePage from './components/homePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } /> 
        <Route path="/register" element={ <Register />}  />
        <Route path="/home" element={ <HomePage />}  />
      </Routes>
    </BrowserRouter>
  )
}

export default App
