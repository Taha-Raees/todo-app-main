import React, { useState } from 'react'
import './GoalForm.scss'

const GoalForm = (props) => {
  const[formData,setFormData]=useState({
    goal:'',
    check:false,
  })
  const submitHandler=(e)=>{
    e.preventDefault()
    props.onAdd(formData)
    console.log(formData)
    setFormData({goal:'',check:false})

  }
    return (
   <div className="form">
    <h1>TODO</h1>
     <form onSubmit={submitHandler}>
      
      <input type="text" name='goal' value={formData.goal} onChange={e=>
          {setFormData({...formData, goal: e.target.value})}}/>
      

  </form>
   </div>
  )
}

export default GoalForm