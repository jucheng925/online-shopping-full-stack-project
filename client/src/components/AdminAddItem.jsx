import React, {useState} from 'react'
import ItemAddForm from './ItemAddForm';
import StyledButton from '../StyledButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AdminAddItem = () => {
  const [showItemForm, setShowItemForm] = useState(false)
  
  return (
    <div>
        {showItemForm ?  
        <StyledButton style={{backgroundColor:"#bf4242"}} onClick={()=>setShowItemForm(!showItemForm)} startIcon={<CloseIcon />}>
          Close Form
        </StyledButton> : 
        <StyledButton onClick={()=>setShowItemForm(!showItemForm)} startIcon={<AddIcon />}>
          Add a New Item
        </StyledButton>
        }
        {/* {showItemForm ? <ItemAddForm addItem={addItem} storeId = {store.id}/> : null} */}

        {showItemForm ? <ItemAddForm/> : null}
    </div>
  )
}

export default AdminAddItem
