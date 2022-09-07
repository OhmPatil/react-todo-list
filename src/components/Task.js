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
    <div className='border-black border-2 flex flex-col my-2 h-fitcontent w-[400px] sm:w-[600px] md:w-[800px]'>
        <p className='font-bold text-xl px-2'>{props.title}</p>
        <p className='px-2'>{props.desc}</p>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={toggleShowEditTask}>Edit</button>
        <EditTask showEditForm={showEditTask} handleClick={toggleShowEditTask} id={props.id}/>
    </div>
  )
}

export default Task