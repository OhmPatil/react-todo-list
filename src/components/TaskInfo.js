import React from 'react'
import {  AnimatePresence, motion } from "framer-motion";
import buttonVariants from "./framer-variants/ButtonVariants";
import getDayDifference from '../utils/getDayDifference'


function TaskInfo(props) {

    return (
        <AnimatePresence>
        {props.showTaskInfo && (
        <motion.div className="fixed w-screen h-screen bg-gray-700/50 flex justify-center items-center backdrop-blur-sm top-0 left-0 z-[1]"
        initial={{y: '-100vh'}}
        animate={{y: 0}}
        transition={{type: 'easeIn', when: 'beforeChildren'}}
        exit={{y: '-100vh'}}>
          <motion.div className="w-[95%] h-fitcontent sm:w-[500px] bg-black p-4 rounded-xl drop-shadow-xl shadow-md"
          initial={{opacity: 0, y: -200}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.25}}>
            <div className='text-white font-bold'>{props.task.data.title}</div>
            <div className='text-white'>{props.task.data.description}</div>
            <div className='text-white'>Due in {getDayDifference(props.task.data.dueDate)} days</div>
            <div className="w-full flex justify-center items-center">
                <motion.button onClick={props.handleClose} variants={buttonVariants} whileHover='hover' whileTap='click'  type="submit" className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm sm:text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-2 py-1 sm:px-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Close
                    </span>
                </motion.button>
            </div>
            <button onClick={props.handleClose} className='w-inherit h-inherit fixed top-1 right-1 hover:cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 fixed top-1.5 right-1.5 hover:cursor-pointer'">
                  <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                </svg>
            </button>
          </motion.div>
        </motion.div>
          )}
        </AnimatePresence>
      );
    };

export default TaskInfo