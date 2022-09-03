import React from 'react'
import {auth, logout} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'


function Dashboard() {
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()


  useEffect(() => {
    if(!user) return navigate('/login')
  }, [user, navigate])

  console.log(user);
  
  return (
    <div className='text-3xl'>
      <h1>Hi, {user && user.displayName}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard