import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { database } from '../firebase';

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
    <div>
      <form onSubmit={(event) => handleUpdate(event)}>
        <input
          type="text"
          name="title"
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
          placeholder="Enter title"
          className="border-black border-2"
          required
        />

        <input
          type="text"
          name="description"
          value={editedDesc}
          onChange={(event) => setEditedDesc(event.target.value)}
          placeholder="Enter Description"
          className="border-black border-2"
        />
        <button type="submit" className="border-blue-500 border-2">Submit</button>
        <button type="submit" className="border-blue-500 border-2" onClick={props.handleClick}>Close</button>
      </form>
    </div>
      )}
    </>
  )
}

export default EditTask