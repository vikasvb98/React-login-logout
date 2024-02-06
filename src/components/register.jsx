import React, { useState } from 'react';
// import { useFirebase } from '../context/firebase';
import { fireBase } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    
    // const firebase = useFirebase();
    // console.log(firebase)
    const auth = getAuth(fireBase)

    const handleButtonClick = () => {
      setLoading(true);
  
      
      setTimeout(() => {
        setLoading(false);
      
      }, 2000); 
    };

    const handleRegisterWithEmailAndPassword = async (event) => {
      handleButtonClick();
      event.preventDefault();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName: username });

        setFullName('');
        setEmail('');
        setPassword('');
        setUsername('');
        setErrorMessage('');

      } catch (error) {
        setErrorMessage(error.message);
      }
    };
  
    return (
      <div className="flex justify-center items-center  h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form className="" onSubmit={handleRegisterWithEmailAndPassword}>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block mb-2">Full Name:</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 border rounded-md" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-md" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-md" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="username" className="block mb-2">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded-md" required />
                  </div>
                  {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                  <button type="submit" className={` bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600  ${ isLoading ? 'opacity-50 cursor-not-allowed': ''}`} disabled={isLoading} > {isLoading ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span className="ml-2">Loading...</span>
                      </div>) : ('Register' )}</button>
                </form>
          </div>
      </div>
    );
  };
export default Register;
