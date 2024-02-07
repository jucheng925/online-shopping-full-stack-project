import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminButton = ({deleteStore, store, showForm, setShowForm}) => {
  const navigate = useNavigate()
  return (
    <div>
      <button className='adminbutton' onClick ={deleteStore}>Delete Store </button>
      <button className='adminbutton' onClick ={() => {navigate(`/stores/${store.id}/edit`, {state:store})}}>Edit Store </button>
      <button className='adminbutton' onClick={()=>setShowForm(!showForm)}>{showForm ? "Close Form" : "Add a New Item"} </button>
    </div>
  )
}

export default AdminButton
