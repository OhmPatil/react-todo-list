import { useState } from "react";
import { database, auth } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {  motion } from "framer-motion";

const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("")

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await addDoc(collection(database, "tasks"), {
        title: title,
        description: description,
        isCompleted: false,
        created: Timestamp.now(),
        dueDate: new Date(dueDate),
        uid: auth.currentUser.uid
      });
    } catch (error) {
      alert(error);
    }

    setTitle("");
    setDescription("");
    props.handleClick()
  }

  return (
    <>
    {props.showForm && (
    <motion.div className="fixed w-screen h-screen bg-gray-700/50 flex justify-center items-center backdrop-blur-sm top-0 left-0 z-[1]"
    initial={{y: '-100vh'}}
    animate={{y: 0}}
    transition={{type: 'easeIn', when: 'beforeChildren'}}>
      <motion.div className="w-[95%] h-fitcontent sm:w-[500px] bg-black p-4 rounded-xl drop-shadow-xl shadow-md"
      initial={{opacity: 0, y: -200}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.25}}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-5'>
          <div className="flex justify-evenly gap-2">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter title"
              className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />

            <input
              type="text"
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter Description"
              className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="flex justify-evenly gap-2">
            <label htmlFor="duedate" className="text-white w-1/2 flex justify-center">Due Date</label>
            <input
              type="date"
              id="duedate"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              placeholder='Due Date'
              className='w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <button  type="submit" className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm sm:text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className="relative px-2 py-1 sm:px-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add
              </span>
          </button>
          </div>

          <button onClick={props.handleClick} className='w-inherit h-inherit fixed top-1 right-1 hover:cursor-pointer'>
            <svg onClick={props.handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 fixed top-1.5 right-1.5 hover:cursor-pointer'">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </form>
      </motion.div>
    </motion.div>
      )}
    </>
  );
};

export default AddTask;
