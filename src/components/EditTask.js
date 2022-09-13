import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../firebase";
import { AnimatePresence, motion } from "framer-motion";
import editTaskVariants from "./framer-variants/EditTaskVariants";
import buttonVariants from "./framer-variants/ButtonVariants";

function EditTask(props) {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  async function handleUpdate(event) {
    event.preventDefault();
    event.stopPropagation();
    const docRef = doc(database, "tasks", props.id);
    try {
      await updateDoc(docRef, {
        title: editedTitle,
        description: editedDesc,
      });
      setEditedTitle("");
      setEditedDesc("");
      props.handleClick(event);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AnimatePresence>
      {props.showEditForm && (
        <motion.div
          className="w-full flex items-center"
          variants={editTaskVariants}
          animate="visible"
          initial="hidden"
          exit="exit"
        >
          <form
            onSubmit={(event) => handleUpdate(event)}
            className="w-full flex justify-between items-center"
          >
            <input
              onClick={(event) => event.stopPropagation()}
              type="text"
              name="title"
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
              placeholder="Title"
              className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />

            <input
              onClick={(event) => event.stopPropagation()}
              type="text"
              name="description"
              value={editedDesc}
              onChange={(event) => setEditedDesc(event.target.value)}
              placeholder="Description"
              className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <motion.button
              onClick={(event) => event.stopPropagation()}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="click"
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium sm:font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
            >
              <span className="relative px-1 py-1 sm:px-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="click"
              onClick={(event) => props.handleClick(event)}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium sm:font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-1 py-1 sm:px-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Close
              </span>
            </motion.button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditTask;
