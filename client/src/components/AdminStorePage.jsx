import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import AdminButton from './AdminButton'
import ItemAddForm from './ItemAddForm'

const AdminStorePage = ({store}) => {
  const {currentUser} = useContext(UserContext)
  const [showItemForm, setShowItemForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const navigate = useNavigate()

  const deleteStore =(storeId)=>{
    if (currentUser.isAdmin) {
      fetch(`/api/stores/${storeId}`, {
      method: "DELETE",
      }).then(()=>navigate('/stores'))
    }
  }

  const addItem = (newItem)=> {
    const newArray = [...items, newItem]
    setItems(newArray)
    setShowForm(false)
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
          showItemForm={showItemForm}
          setShowItemForm={setShowItemForm}
        /> 
        {showItemForm ? <ItemAddForm addItem={addItem} storeId = {store.id}/> : null}
      </>
    )
  }
}

export default AdminStorePage
