import React from 'react'
import { useState } from 'react';
import { fireBase } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logo from "../assets/alpaago-logo.png"


const auth = getAuth(fireBase)

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleButtonClick = () => {
      setLoading(true);
  
      
      setTimeout(() => {
        setLoading(false);
      
      }, 2000); 
    };
  
    const handleLogin = async (event) => {
      handleButtonClick();
      event.preventDefault();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful:', userCredential.user.email);
        setEmail('');
        setPassword('');

        navigate('/home');
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
  
    return (
      <div className="flex h-screen">
        <div className="w-1/3 bg-cyan-300 hidden md:flex content-center justify-items-center">
            <img src={logo} alt="logo" className="fixed bg-inherit w-20 h-20" />
            <div className="flex justify-center items-center px-5">
                <div className="p-5">
                 <p>Nice to see you again.</p>   
                <h1 className="text-3xl font-bold mb-4">Welcome Back !</h1>
                <div className="bg-cyan-200 px-3 rounded">
                    <p className="font-medium mb-2">Demo email: <span className='font-thin'>demo@example.com</span></p>
                    <p className="font-medium mb-4">Demo pass: <span className='font-thin'>demo123</span></p>
                </div>
                <p>Feel free to use the demo credentials to <span className="text-cyan-950">explore!</span> </p>
                </div>
            </div>
        </div>
        <div className="w-2/3 flex items-center justify-center">
          <form onSubmit={handleLogin} className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-md" required/>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <a href="#" className="text-blue-500">Forgot password?</a>
            </div>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <button type="submit" className={ `bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${ isLoading ? 'opacity-50 cursor-not-allowed': ''}`} disabled={isLoading} >
            {isLoading ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span className="ml-2">Loading...</span>
                      </div>) : ('Login' )}
            </button>
          </form>
        </div>
        <div className="absolute top-0 right-0 m-4">
          <Link to="/register">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Sign Up</button>
          </Link>
        </div>
      </div>
    );
  };

export default Login