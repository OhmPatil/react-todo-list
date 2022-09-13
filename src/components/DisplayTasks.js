import React from 'react'
import Task from './Task';

function DisplayTasks(props) {
  return (
    <div>{props.tasks.map((task, index) => {
        return <Task key={index} id={task.id} title={task.data.title} desc={task.data.description} created={task.data.created} isCompleted={task.data.isCompleted} dueDate={task.data.dueDate} handleTaskClick={props.handleTaskClick}/>
    })}</div>
  )
}

export default DisplayTasks