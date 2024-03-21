import React from 'react'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import StyledButton from '../StyledButton';

const AdminButton = ({deleteStore, store, showForm, setShowForm}) => {
  const navigate = useNavigate()
  return (
    <Stack spacing={2} direction="column" style={{alignItems:"center", padding: "20px"}} >
      <StyledButton style={{backgroundColor:"#bf4242"}} startIcon={<DeleteIcon />} onClick ={deleteStore}>
        Delete Store
      </StyledButton>
      <StyledButton startIcon={<EditIcon />} onClick ={() => {navigate(`/stores/${store.id}/edit`, {state:store})}}>
        Edit Store
      </StyledButton>
      {showForm ?  
        <StyledButton style={{backgroundColor:"#bf4242"}} onClick={()=>setShowForm(!showForm)} startIcon={<CloseIcon />}>
          Close Form
        </StyledButton> : 
        <StyledButton onClick={()=>setShowForm(!showForm)} startIcon={<AddIcon />}>
          Add a New Item
        </StyledButton>
      }
    </Stack>
  )
}

export default AdminButton
