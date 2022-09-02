import { useEffect, useState } from "react";
import { database } from "./firebase";
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import "./App.css";
import AddTask from "./components/AddTask";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from "./pages/login";
import Dashboard from './pages/dashboard'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const q = query(collection(database, 'tasks'), orderBy('created', "desc"))
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  console.log(tasks);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
