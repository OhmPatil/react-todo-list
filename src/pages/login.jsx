import React from "react";
import {useNavigate} from 'react-router-dom'
import {auth, signInWithGoogle, logInWithEmailAndPassword} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity:0,
    y: '100vh',
    rotate: 180,
    borderRadius: 500
  },
  visible: {
    opacity:1,
    y:0,
    rotate:0,
    borderRadius: 16,
    transition: {
      delay:0.5,
      duration:1,
      type:'spring'
    }
  }
}

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
    <div className="flex justify-center items-center bg-gradient-to-tr from-[rgb(50,50,50)] to-black w-screen h-screen">
      <motion.div className="flex flex-col items-center justify-center gap-3 text-center w-[600px] h-[600px] rounded-2xl bg-[#222224]/60 bg-gradient-to-bl from-[rgb(50,50,50)]/10 to-black/10  drop-shadow-xl shadow-md"
      variants={cardVariants}
      initial='hidden'
      animate='visible'
      >
        <div>
          <h1 className="text-3xl font-semibold text-white">Login</h1>
        </div>
        <div className="w-[60%]">
          <form action="/" className="flex flex-col gap-2 items-center">
            <div className="w-full mb-4 text-left">
              <label for="email" class="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300">Email</label>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required/>
            </div>
            <div className="w-full mb-4 text-left">
              <label for="password" class="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300">Password</label>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required/>
            </div>
            <button onClick={(event) => logInWithEmailAndPassword(event, email, password )} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-md font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Log In
              </span>
            </button>
            <div className="w-full flex justify-between items-center">
              <div className="w-[45%] h-[2px] bg-white/50"></div>
              <div className="text-white/90 font-semibold text-md">Or</div>
              <div className="w-[45%] h-[2px] bg-white/50"></div>
            </div>
            <button onClick={(event) => signInWithGoogle(event)} type="button" className="mt-2 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 font-semibold rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center" >
              <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
              Sign in with Google
            </button>
            <div className="flex gap-2 mt-2 text-white font-semibold">
              <p>New user ?</p>
              <button onClick={(event) => handleRegisterButtonClick(event)} className='text-indigo-500'>Register Now</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
