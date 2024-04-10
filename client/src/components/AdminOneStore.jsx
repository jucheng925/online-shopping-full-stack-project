import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import AdminButton from './AdminButton'
import ItemsList from './ItemsList'
import AdminAddItem from './AdminAddItem'

const AdminOneStore = ({store}) => {
  const {currentUser} = useContext(UserContext)
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
        /> 
        <ItemsList items={store.items}/>
        {/* <ItemsList items={items} onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem} />  */}
        <AdminAddItem/>
      </>
    )
  }
}

export default AdminOneStore
