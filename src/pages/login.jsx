import React from "react";
import {useNavigate} from 'react-router-dom'
import {auth, signInWithGoogle} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from "react";

function Login() {

  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()

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
            <input type="text" name="email" placeholder="Email Address" className="w-full rounded-md p-1"/>
            <input type="text" name="password" placeholder="Password" className="w-full rounded-md p-1"/>
            <button type="submit" className="w-40 bg-indigo-500 text-white rounded-xl p-1 hover:drop-shadow-lg">Log In</button>
            <button onClick={(event) => signInWithGoogle(event)} className="w-40 bg-indigo-500 text-white rounded-xl p-1 hover:drop-shadow-lg">Sign in with Google</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
