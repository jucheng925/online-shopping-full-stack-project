import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Notfound } from './ErrorPage'
import AdminButton from './AdminButton'
import ItemsList from './ItemsList'
import ItemAddForm from './ItemAddForm'

const StorePage = () => {
  const {currentUser} = useContext(UserContext)
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [store, setStore] = useState(location.state)
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)


  useEffect(()=> {
    if (store == null) {
      fetch(`/api/stores/${params.id}`)
      .then(resp=> resp.json())
      .then(store => {
        setStore(store)
        setItems(store.items)
      })
    } else {
      setItems(location.state.items)
    }
  }, [])


  const deleteStore =()=>{
    fetch(`/api/stores/${store.id}`, {
    method: "DELETE",
    }).then(()=>navigate('/stores'))
  }

  const deleteItem = (deleteItemId)=> {
    const newItemsList = items.filter((item) => item.id !== deleteItemId)
    setItems(newItemsList)
  }

  const addItem = (newItem)=> {
    const newArray = [...items, newItem]
    setItems(newArray)
    setShowForm(false)
  }

  if (store && currentUser) {
    return (
      <>
        {currentUser.isAdmin ? <AdminButton 
                      deleteStore={deleteStore} 
                      store={store}
                      showForm={showForm}
                      setShowForm={setShowForm}
                      /> 
                  : null}
        {showForm ? <ItemAddForm addItem={addItem} storeId = {store.id}/> : null}
        <h2>{store.store_name}</h2>
        <p style={{fontStyle:"italic"}}>{store.description}</p>
        <div>
          <ItemsList items={items} deleteItem={deleteItem}/>
        </div>
      </>

    )
  } else {
    return (
      <Notfound/>
    )
  }
}

export default StorePage
