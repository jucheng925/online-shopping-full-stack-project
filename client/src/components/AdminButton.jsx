import React from 'react'

const AdminButton = ({deleteStore}) => {
  return (
    <div>
      <button className='adminbutton' onClick ={deleteStore}>Delete Store </button>
      <button className='adminbutton'>Edit Store </button>
      <button className='adminbutton'>Add Item </button>
      <button className='adminbutton'>Delete Item </button>
    </div>
  )
}

export default AdminButton
