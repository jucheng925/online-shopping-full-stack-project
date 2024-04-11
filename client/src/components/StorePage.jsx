import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import { Notfound } from './ErrorPage'

import ItemsList from './ItemsList'
import AdminOneStore from './AdminOneStore'

const StorePage = () => {
  const {currentUser} = useContext(UserContext)
  const [store, setStore] = useState()

  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    setIsLoading(true);
    fetch(`/api/stores/${params.id}`)
    .then(resp=> {
      setIsLoading(false)
      if (resp.ok) {
        resp.json().then(store => {
          setStore(store)
        })
      }
    } 
  )}, [])

  const addItem = (newItem)=> {
    const newItemArray = [...store.items, newItem]
    const updatedStore = {...store, items: newItemArray}
    setStore(updatedStore)
  }

  const onDeleteItem = (deleteItemId)=> {
    const newItemsList = store.items.filter((item) => item.id !== deleteItemId)
    const updatedStore = {...store, items:newItemsList}
    setStore(updatedStore)
  }

  const onUpdateItem = (updatedItem)=> {
    const updatedItems = store.items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    });
    const updatedStore = {...store, items:updatedItems}
    setStore(updatedStore)
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

          {currentUser.isAdmin ? 
            <AdminOneStore store={store} addItem={addItem} onDeleteItem={onDeleteItem}/> 
            :
            <ItemsList items={store.items} onUpdateItem={onUpdateItem}/> 
          }
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
