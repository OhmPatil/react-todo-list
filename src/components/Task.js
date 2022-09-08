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
    <div className='bg-[#222224]/70 bg-gradient-to-b from-[rgb(50,50,50)]/60 to-black/40 flex my-4 h-fitcontent w-[97vw] sm:w-[550px] md:w-[800px] py-4 px-2 sm:px-4 rounded-xl drop-shadow-xl shadow-md '>
      <div className='w-full flex justify-between items-center'>
        <div className='flex items-center w-1/3'>
          <input type='checkbox' onChange={handleCheckboxChange} checked={props.isCompleted} className='w-[15px] h-[15px] sm:w-5 sm:h-5'/>
          <p className='font-bold text-sm sm:text-xl px-2 w-[85%] text-white break-words'>{props.title}</p>
        </div>
          <p className='text-sm sm:text-base px-2 text-white w-1/2'>Due: {props.dueDate.toDate().toDateString()}</p>
          <div className='flex items-center gap-3 sm:gap-4'>
            <div onClick={toggleShowEditTask} className='hover:cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='text-yellow-500 w-5 h-5 sm:w-6 sm:h-6'>
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
            <div onClick={handleDelete} className='hover:cursor-pointer'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-red-600 sm:w-6 sm:h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
          </div>
      </div>
        <EditTask showEditForm={showEditTask} handleClick={toggleShowEditTask} id={props.id}/>
    </div>
  )
}

export default Task