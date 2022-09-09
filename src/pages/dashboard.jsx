import React from "react";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import DisplayTasks from "../components/DisplayTasks";
import { useState } from "react";
import { motion } from "framer-motion";
import taskVariants from "../components/framer-variants/TaskVariants";
import buttonVariants from "../components/framer-variants/ButtonVariants";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [showAddTask, setShowAddTask] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, navigate]);

  function toggleShowAddTask(){
    setShowAddTask(!showAddTask)
  }
  
  return (
    <>
    <div className="flex gap-2 justify-end h-[5vh] items-center bg-black text-white border-b-2 border-white pr-2">
      {user && <p className="font-light">Logged in as {user.email}</p>}
      <motion.button variants={buttonVariants} whileHover='hover' whileTap='click' onClick={logout} className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-base px-3 py-1.5 text-center'>Sign Out</motion.button>
    </div>
    <div className="flex h-[95vh] w-screen bg-black overflow-x-hidden">
      <div className="w-full h-full flex flex-col items-center">
        <DisplayTasks />
        <motion.button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm sm:text-base font-medium sm:font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white" onClick={toggleShowAddTask}
        variants={taskVariants}
        animate='visible'
        initial='hidden'>
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add Task
          </span>
          </motion.button>
        <AddTask showForm={showAddTask} handleClick={toggleShowAddTask}/>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
