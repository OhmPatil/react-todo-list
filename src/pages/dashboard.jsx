import React from "react";
import { auth, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTask from "../components/AddTask";
import DisplayTasks from "../components/DisplayTasks";
import { useState } from "react";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
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
    <div className="flex gap-2 justify-end">
      {user && <p>Logged in as {user.email}</p>}
      <button onClick={logout} className='rounded border-black border-2'>Sign Out</button>
    </div>
    <div className="flex h-screen w-screen bg-black overflow-x-hidden">
      <div className="w-full h-full flex flex-col items-center">
        <DisplayTasks />
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm sm:text-base font-medium sm:font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white" onClick={toggleShowAddTask}>
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Add Task
          </span>
          </button>
        <AddTask showForm={showAddTask} handleClick={toggleShowAddTask}/>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
