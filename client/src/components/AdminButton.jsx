import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminButton = ({deleteStore, store}) => {
  const navigate = useNavigate()
  return (
    <div>
      <button className='adminbutton' onClick ={deleteStore}>Delete Store </button>
      <button className='adminbutton' onClick ={() => {navigate(`/stores/${store.id}/edit`, {state:store})}}>Edit Store </button>
      <button className='adminbutton'>Add Item </button>
      <button className='adminbutton'>Delete Item </button>
    </div>
  )
}

export default AdminButton
