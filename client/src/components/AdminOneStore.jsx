import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import AdminButton from './AdminButton'
import ItemsList from './ItemsList'
import ItemAddForm from './ItemAddForm';
import StyledButton from '../StyledButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AdminOneStore = ({store, addItem, onDeleteItem}) => {
  const {currentUser, contextDeleteStore} = useContext(UserContext)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showItemForm, setShowItemForm] = useState(false)
  const navigate = useNavigate()

  const deleteStore =(storeId)=>{
    if (currentUser.isAdmin) {
      fetch(`/api/stores/${storeId}`, {
        method: "DELETE",
      })
      .then(() => (
        contextDeleteStore(storeId),
        navigate('/stores')
      ))
    }
  }

  if (currentUser.id !== store.user_id) {
    return (
      <h4>Not authorized to view. Please sign in as a Shopper</h4>
    )
  } else {
    return (
      <>
        <AdminButton 
          deleteStore={deleteStore} 
          store={store}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
        /> 

        <ItemsList items={store.items} onDeleteItem={onDeleteItem}/>
        
        <div>
          {showItemForm ?  
          <StyledButton style={{backgroundColor:"#bf4242"}} onClick={()=>setShowItemForm(!showItemForm)} startIcon={<CloseIcon />}>
            Close Form
          </StyledButton> : 
          <StyledButton onClick={()=>setShowItemForm(!showItemForm)} startIcon={<AddIcon />}>
            Add a New Item
          </StyledButton>
          }

          {showItemForm ? <ItemAddForm store={store} addItem={addItem} showItemForm={showItemForm} setShowItemForm={setShowItemForm}/> : null}
        </div>

      </>
    )
  }
}

export default AdminOneStore
