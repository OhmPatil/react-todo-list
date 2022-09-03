import React from 'react'
import {auth, logout} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import AddTask from '../components/AddTask'
import DisplayTasks from '../components/DisplayTasks'


function Dashboard() {
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()


  useEffect(() => {
    if(!user) return navigate('/login')
  }, [user, navigate])

  // console.log(auth.uid);

  
  return (
    <div>
      <h1>Hi, {user && user.displayName}</h1>
      <button className='border-2' onClick={logout}>Logout</button>
      <AddTask/>
      <DisplayTasks/>
    </div>
  )
}

export default Dashboard