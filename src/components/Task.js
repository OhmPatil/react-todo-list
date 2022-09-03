import React from 'react'

function Task(props) {
  return (
    <div className='flex border-2 border-blue-500 my-2'>
        <p>{props.title}</p>
    </div>
  )
}

export default Task