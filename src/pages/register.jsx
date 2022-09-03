import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import {auth, registerUserWithEmailAndPassword} from '../firebase'

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if(user) return navigate('/dashboard')
    }, [user, navigate])
    
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500 w-screen h-screen">
      <div className="flex flex-col items-center justify-center gap-3 text-center w-[600px] h-[600px] rounded-2xl bg-slate-200/50 drop-shadow-xl">
        <div>
          <h1 className="text-3xl font-semibold">Register</h1>
        </div>
        <div className="w-[60%]">
          <form action="/" className="flex flex-col gap-2 items-center">
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" name="email" placeholder="Name" className="w-full rounded-md p-1"/>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" name="email" placeholder="Email Address" className="w-full rounded-md p-1"/>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" name="password" placeholder="Password" className="w-full rounded-md p-1"/>
            <button onClick={(event) => registerUserWithEmailAndPassword(event, name, email, password)} className="w-40 bg-indigo-500 text-white rounded-xl p-1 hover:drop-shadow-lg">Register Now</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register