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
    <div className="flex h-screen">
      <div className="w-[15%] h-full border-2 border-red-600">

      </div>
      <div className="w-[85%] h-full border-2 border-black">
        <DisplayTasks />
        <button className="border-2 border-red-400" onClick={toggleShowAddTask}>Add Task</button>
        <AddTask showForm={showAddTask} handleClick={toggleShowAddTask}/>
      </div>
    </div>
    </>
  );
}

export default Dashboard;
