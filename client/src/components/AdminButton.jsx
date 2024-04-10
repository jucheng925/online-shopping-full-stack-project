import React from 'react'
import StoreEditForm from './StoreEditForm';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import StyledButton from '../StyledButton';

const AdminButton = ({deleteStore, store, showItemForm, setShowItemForm, showEditForm, setShowEditForm}) => {

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

      <br />

      {showItemForm ?  
        <StyledButton style={{backgroundColor:"#bf4242"}} onClick={()=>setShowItemForm(!showItemForm)} startIcon={<CloseIcon />}>
          Close Form
        </StyledButton> : 
        <StyledButton onClick={()=>setShowItemForm(!showItemForm)} startIcon={<AddIcon />}>
          Add a New Item
        </StyledButton>
      }
    </Stack>
  )
}

export default AdminButton
