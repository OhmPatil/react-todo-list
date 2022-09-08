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
    <div className='bg-[#222224]/70 bg-gradient-to-b from-[rgb(50,50,50)]/60 to-black/40 flex my-4 h-fitcontent w-[350px] sm:w-[550px] md:w-[800px] p-4 gap-4 rounded-xl drop-shadow-xl shadow-md '>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center'>
          <input type='checkbox' onChange={handleCheckboxChange} checked={props.isCompleted} className='w-[15px] h-[15px] sm:w-5 sm:h-5'/>
          <p className='font-bold text-sm sm:text-xl px-2 text-white'>{props.title}</p>
        </div>
          <p className='text-sm sm:text-base px-2 text-white'>Due: {props.dueDate.toDate().toDateString()}</p>
          <div className='flex items-center gap-2 sm:gap-4'>
            <button onClick={toggleShowEditTask} className='text-yellow-500 text-sm sm:text-base'>Edit</button>
            <button onClick={handleDelete} className='text-red-600 text-sm sm:text-base'>Delete</button>
          </div>
      </div>
        <EditTask showEditForm={showEditTask} handleClick={toggleShowEditTask} id={props.id}/>
    </div>
  )
}

export default Task