import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {sendPasswordReset} from '../firebase'

function ResetPass() {

  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleResetClick = async () => {
    await sendPasswordReset(email)
    return navigate('/login')
  }
    
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen">
      <div className="flex flex-col items-center justify-center gap-3 text-center w-[600px] h-[600px] rounded-2xl bg-slate-200/50 drop-shadow-xl">
        <div>
          <h1 className="text-3xl font-semibold">Reset Password</h1>
        </div>
        <div className="w-[60%] flex flex-col gap-2 items-center">
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" name="email" placeholder="Email Address" className="w-full rounded-md p-1"/>
            <button onClick={() => handleResetClick(email)} className="w-40 bg-indigo-500 text-white rounded-xl p-1 hover:drop-shadow-lg">Send Link</button>
        </div>
      </div>
    </div>
  )
}

export default ResetPass