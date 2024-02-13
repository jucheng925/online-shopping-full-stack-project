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
      if (resp.ok) {
        resp.json().then(store => {
          setStore(store)
          setItems(store.items)
          setIsLoading(false)
        })
      } 
    } 
  )}, [])


  const deleteStore =()=>{
    fetch(`/api/stores/${params.id}`, {
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
            <ItemsList items={items} deleteItem={deleteItem} /> 
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
