import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {sendPasswordReset} from '../firebase'
import { motion } from "framer-motion";
import cardVariants from '../components/framer-variants/CardVariants';

function ResetPass() {

  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleResetClick = async () => {
    await sendPasswordReset(email)
    return navigate('/login')
  }
    
  return (
    <div className="flex justify-center items-center bg-gradient-to-tr from-[rgb(50,50,50)] to-black w-screen h-screen overflow-hidden">
      <motion.div className="flex flex-col items-center justify-center gap-3 text-center w-[600px] h-[600px] rounded-2xl bg-[#222224]/60 bg-gradient-to-bl from-[rgb(50,50,50)]/10 to-black/10 drop-shadow-xl shadow-md"
        variants={cardVariants}
        animate='visible'
        initial='hidden'
        >
        <div>
          <h1 className="text-3xl font-semibold text-white">Reset Password</h1>
        </div>
        <div className="w-[60%] flex flex-col gap-2 items-center">
          <div className="w-full mb-4 text-left">
            <label htmlFor="email" className="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300">Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" name='email'className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='youremail@example.com' required/>
          </div>
          <button onClick={() => handleResetClick(email)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-md font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Send Reset Link
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ResetPass