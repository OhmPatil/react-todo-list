import React from "react";
import {useNavigate} from 'react-router-dom'
import {auth, signInWithGoogle, logInWithEmailAndPassword} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from "react";
import { useState } from "react";

function Login() {

  const [user, loading, error] = useAuthState(auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegisterButtonClick = (event) =>{
    event.preventDefault()
    navigate('/register')
  }

  useEffect(() => {
    if(user) navigate('/dashboard')
  }, [user, navigate])
  
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen">
      <div className="flex flex-col items-center justify-center gap-3 text-center w-[600px] h-[600px] rounded-2xl bg-slate-200/50 drop-shadow-xl">
        <div>
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <div className="w-[60%]">
          <form action="/" className="flex flex-col gap-2 items-center">
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" name="email" placeholder="Email Address" className="w-full rounded-md p-1"/>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="text" name="password" placeholder="Password" className="w-full rounded-md p-1"/>
            <button onClick={(event) => logInWithEmailAndPassword(event, email, password)} className="w-40 bg-indigo-500 text-white rounded-xl p-1 hover:drop-shadow-lg">Log In</button>
            <button onClick={(event) => signInWithGoogle(event)} className="w-40 bg-indigo-500 text-white rounded-xl p-1 hover:drop-shadow-lg">Sign in with Google</button>
            <button onClick={(event) => handleRegisterButtonClick(event)} className="w-40 bg-indigo-500 text-white rounded-xl p-1 hover:drop-shadow-lg">Register Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
