import React from 'react'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AdminButton = ({deleteStore, store, showForm, setShowForm}) => {
  const navigate = useNavigate()
  return (
    <Stack spacing={3} direction="column" style={{width:"60%", margin: "auto", padding: "20px"}} >
      <Button variant="contained" style={{backgroundColor:"#8ebf42"}} size="medium" startIcon={<DeleteIcon />} onClick ={deleteStore}>
        Delete Store
      </Button>
      <Button variant="contained" style={{backgroundColor:"#8ebf42"}} size="medium" startIcon={<EditIcon />} onClick ={() => {navigate(`/stores/${store.id}/edit`, {state:store})}}>
        Edit Store
      </Button>
      {showForm ?  
        <Button variant="contained" style={{backgroundColor:"#8ebf42"}} size="medium" onClick={()=>setShowForm(!showForm)} startIcon={<CloseIcon />}>
          Close Form
        </Button> : 
        <Button variant="contained" style={{backgroundColor:"#8ebf42"}} size="medium" onClick={()=>setShowForm(!showForm)} startIcon={<AddIcon />}>
          Add a New Item
        </Button>
      }
      {/* <button className='adminbutton' onClick ={deleteStore}>Delete Store </button>
      <button className='adminbutton' onClick ={() => {navigate(`/stores/${store.id}/edit`, {state:store})}}>Edit Store </button>
      <button className='adminbutton' onClick={()=>setShowForm(!showForm)}>{showForm ? "Close Form" : "Add a New Item"} </button> */}
    </Stack>
  )
}

export default AdminButton
