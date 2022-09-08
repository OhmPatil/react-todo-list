import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { database } from '../firebase';
import { motion } from "framer-motion";

function EditTask(props) {

    const [editedTitle, setEditedTitle] = useState('')
    const [editedDesc, setEditedDesc] = useState('')

    async function handleUpdate(event){
        event.preventDefault()
        const docRef = doc(database, 'tasks', props.id)
        try{
            await updateDoc(docRef, {
                title: editedTitle,
                description: editedDesc,
            })
            setEditedTitle('')
            setEditedDesc('')
            props.handleClick()
        }
        catch(error){
            alert(error);
        }
    }

    
  return (
    <>
    {props.showEditForm && (
    <motion.div className='w-full flex items-center'>
      <form onSubmit={(event) => handleUpdate(event)} className='w-full flex justify-between items-center'>
        <input
          type="text"
          name="title"
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
          placeholder="Title"
          className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />

        <input
          type="text"
          name="description"
          value={editedDesc}
          onChange={(event) => setEditedDesc(event.target.value)}
          placeholder="Description"
          className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button type='submit' className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium sm:font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-1 py-1 sm:px-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Submit
          </span>
        </button>
        <button onClick={props.handleClick} className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium sm:font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span className="relative px-1 py-1 sm:px-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Close
          </span>
        </button>
      </form>
    </motion.div>
      )}
    </>
  )
}

export default EditTask