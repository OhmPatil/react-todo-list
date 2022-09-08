import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { database } from '../firebase';
import EditTask from './EditTask';
import getDayDifference from '../utils/getDayDifference'

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

  async function handleCheckboxChange(){
    const docRef = doc(database, 'tasks', props.id)
    const task = await getDoc(docRef)

    if(task.data().isCompleted === false) {
      try {
        await updateDoc(docRef, {
          isCompleted: 'checked',
        }) 
      }
      catch(error){
        alert(error)
      }
    }
    else{
      try {
        await updateDoc(docRef, {
          isCompleted: false,
        }) 
      }
      catch(error){
        alert(error)
      }
    }
  }

  getDayDifference(props.dueDate);

  return (
    <div className='border-white border-2 flex flex-col my-2 h-fitcontent w-[400px] sm:w-[550px] md:w-[800px]'>
      <div className='flex justify-between items-center'>
        <input type='checkbox' onChange={handleCheckboxChange} checked={props.isCompleted}/>
        <p className='font-bold text-xl px-2 text-white'>{props.title}</p>
        <p className='text-md px-2 text-white'>Due on: {props.dueDate.toDate().toDateString()}</p>
      </div>
        {props.isCompleted && <pre className='text-white'>YES</pre>}
        {!props.isCompleted && <pre className='text-white'>NO</pre>}
        <button onClick={handleDelete} className='text-white'>Delete</button>
        <button onClick={toggleShowEditTask} className='text-white'>Edit</button>
        <EditTask showEditForm={showEditTask} handleClick={toggleShowEditTask} id={props.id}/>
    </div>
  )
}

export default Task