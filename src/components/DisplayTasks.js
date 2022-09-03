import React, { useEffect, useState } from 'react'
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { database, auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

function DisplayTasks() {
    const [tasks , setTasks] = useState([])
    const [user, loading, error] = useAuthState(auth)


    console.log(tasks);
    
    useEffect(() => {
        if (user) {
            const q = query(collection(database, 'tasks'), where('uid', '==', user.uid))
            onSnapshot(q, (querySnapshot) => {
              setTasks(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              })))
            })
        }
      }, [user])
  return (
    <div>{tasks.map(task => {
        return <pre>{task.data.title} {task.data.description}</pre>
    })}</div>
  )
}

export default DisplayTasks