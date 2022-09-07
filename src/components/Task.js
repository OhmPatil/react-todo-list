import React, { useState } from 'react'
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { database } from '../firebase';
import EditTask from './EditTask';

function Task(props) {

  const [showEditTask, setShowEditTask] = useState(false)

  function toggleShowEditTask(){
    setShowEditTask(!showEditTask)
  }

  async function handleDelete(){
    const docRef = doc(database, 'tasks', props.id)
    try{
      await deleteDoc(docRef)
    }
    catch(error){
      alert(error)
    }
  }
  
  return (
    <div className='border-white border-2 flex flex-col my-2 h-fitcontent w-[400px] sm:w-[550px] md:w-[800px]'>
        <p className='font-bold text-xl px-2 text-white'>{props.title}</p>
        <p className='px-2 text-white'>{props.desc}</p>
        <button onClick={handleDelete} className='text-white'>Delete</button>
        <button onClick={toggleShowEditTask} className='text-white'>Edit</button>
        <EditTask showEditForm={showEditTask} handleClick={toggleShowEditTask} id={props.id}/>
    </div>
  )
}

export default Task