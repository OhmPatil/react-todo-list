import { useEffect, useState } from "react";
import { database, auth } from "../firebase";
import { collection, addDoc, query, Timestamp } from "firebase/firestore";

const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await addDoc(collection(database, "tasks"), {
        title: title,
        description: description,
        isCompleted: isCompleted,
        created: Timestamp.now(),
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter title"
          className="border-black border-2"
          required
        />

        <input
          type="text"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter Description"
          className="border-black border-2"
        />
        <button type="submit" className="border-blue-500 border-2">Submit</button>
        <button type="submit" className="border-blue-500 border-2" onClick={props.handleClick}>Close</button>
      </form>
    </div>
      )}
    </>
  );
};

export default AddTask;
