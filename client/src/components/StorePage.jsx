import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Notfound } from './ErrorPage'
import AdminButton from './AdminButton'
import ItemsList from './ItemsList'
import ItemAddForm from './ItemAddForm'

const StorePage = () => {
  const {currentUser} = useContext(UserContext)
  const params = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [store, setStore] = useState()
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(()=> {
    setIsLoading(true)
    fetch(`/api/stores/${params.id}`)
    .then(resp=> {
      setIsLoading(false)
      if (resp.ok) {
        resp.json().then(store => {
          setStore(store)
          setItems(store.items)
        })
      }
    } 
  )}, [])


  const deleteStore =()=>{
    fetch(`/api/stores/${params.id}`, {
    method: "DELETE",
    }).then(()=>navigate('/stores'))
  }

  const addItem = (newItem)=> {
    const newArray = [...items, newItem]
    setItems(newArray)
    setShowForm(false)
  }

  const onDeleteItem = (deleteItemId)=> {
    const newItemsList = items.filter((item) => item.id !== deleteItemId)
    setItems(newItemsList)
  }

  const onUpdateItem = (updatedItem)=> {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    });
    setItems(updatedItems)
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading ...</p>
      </div>
    )
  } else {
    if (store && currentUser) {
      return (
        <>
          <div>
            <h2>{store.store_name}</h2>
            <p style={{fontStyle:"italic"}}>{store.description}</p>
          </div>
          <hr />
          {currentUser.isAdmin ? <AdminButton 
                        deleteStore={deleteStore} 
                        store={store}
                        showForm={showForm}
                        setShowForm={setShowForm}
                        /> 
                    : null}
          {showForm ? <ItemAddForm addItem={addItem} storeId = {store.id}/> : null}

          <div>
            <ItemsList items={items} onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem} /> 
          </div>
        </>
      )
    } else {
      return (
        <Notfound/>
      )
    }
  }
}

export default StorePage
