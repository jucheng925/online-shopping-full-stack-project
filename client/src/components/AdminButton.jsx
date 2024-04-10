import React from 'react'
import StoreEditForm from './StoreEditForm';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close';
import StyledButton from '../StyledButton';

const AdminButton = ({deleteStore, store, showEditForm, setShowEditForm}) => {

  return (
    <Stack spacing={2} direction="column" style={{alignItems:"center", padding: "20px"}} >
      {showEditForm ?
        <StyledButton style={{backgroundColor:"#bf4242"}} onClick={()=>setShowEditForm(!showEditForm)} startIcon={<CloseIcon />}>
          Close Form
        </StyledButton> : 
        <StyledButton startIcon={<EditIcon />} onClick ={()=>setShowEditForm(!showEditForm)}>
          Edit Store
        </StyledButton>
      }
      {showEditForm ? <StoreEditForm store={store} /> : null}

      <StyledButton style={{backgroundColor:"#bf4242"}} startIcon={<DeleteIcon />} onClick ={()=>deleteStore(store.id)}>
        Delete Store
      </StyledButton>
    </Stack>
  )
}

export default AdminButton
