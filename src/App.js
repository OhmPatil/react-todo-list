import { useEffect, useState } from "react";
import { database } from "./firebase";
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import "./App.css";
import AddTask from "./AddTask";

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
    <div>
      <AddTask/>
      {tasks.map(task => {
        return <pre key={task.id}>{task.data.title}</pre>
      })}
    </div>
  );
}

export default App;
