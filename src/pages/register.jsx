import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import {auth, registerUserWithEmailAndPassword} from '../firebase'
import { motion } from "framer-motion";
import cardVariants from "../components/framer-variants/CardVariants";

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if(user) return navigate('/dashboard')
    }, [user, navigate])

    console.log(loading);
    console.log(error);
    
  return (
    <div className="flex justify-center items-center bg-gradient-to-tr from-[rgb(50,50,50)] to-black w-screen h-screen overflow-hidden">
      <motion.div className="flex flex-col items-center justify-center gap-3 text-center w-[400px] h-fitcontent py-4 mx-2 sm:w-[600px] sm:h-[600px] rounded-2xl bg-[#222224]/60 bg-gradient-to-bl from-[rgb(50,50,50)]/10 to-black/10 drop-shadow-xl shadow-md"
        variants={cardVariants}
        animate='visible'
        initial='hidden'
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">Register</h1>
        </div>
        <div className="w-[85%] sm:w-[70%]">
          <form action="/" className="flex flex-col gap-2 items-center">
            <div className="w-full mb-4 text-left">
              <label htmlFor="name" className="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300">Name</label>
              <input value={name} onChange={(event) => setName(event.target.value)} type="text" name='name'className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required/>
            </div>
            <div className="w-full mb-4 text-left">
              <label htmlFor="email" className="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300">Email</label>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required/>
            </div>
            <div className="w-full mb-4 text-left">
              <label htmlFor="name" className="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300">Password</label>
              <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required/>
            </div>
            <button onClick={(event) => registerUserWithEmailAndPassword(event, name, email, password)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm sm:text-base font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Register
              </span>
            </button>
          </form>
          <div className="flex gap-2 mt-2 text-white font-semibold justify-center items-center text-sm sm:text-base">
              <p>Have an account already?</p>
              <button onClick={() => navigate('/login')} className='text-blue-600'>Log in</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register