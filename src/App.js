import { useEffect, useState } from "react";
import { database, auth } from "./firebase";
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot, where } from "firebase/firestore";
import "./App.css";
import AddTask from "./components/AddTask";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Dashboard from './pages/dashboard'
import Register from "./pages/register";
import ResetPass from "./pages/reset-password";

function App() {
  // useEffect(() => {
  //   const q = query(collection(database, 'tasks'),orderBy('created', "desc"))
  //   onSnapshot(q, (querySnapshot) => {
  //     setTasks(querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })))
  //   })
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/reset" element={<ResetPass/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
