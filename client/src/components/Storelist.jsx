import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Store from './Store'
import StoreForm from './StoreForm'

const Storelist = () => {
  const {currentUser} = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [stores, setStores] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(()=> {
    setIsLoading(true)
    fetch("/api/stores")
    .then(resp => resp.json())
    .then(data => {
          setStores(data)
          setIsLoading(false)
        })
  }, [])


  const addStore = (newStore)=> {
    const newArray = [...stores, newStore]
    setStores(newArray)
    setShowForm(false)
  }

  const AdminStorePage = () => {
    return (
      <div>
          <button style={{width:"40%"}} onClick={()=>setShowForm(!showForm)}>{showForm ? "Close Form" : "Create a New Store"}</button>
          {showForm ? <StoreForm addStore={addStore}/> : null}
          <div className="container">
            <h2><strong>My Stores</strong></h2>
            {stores.filter((store) => store.user_id === currentUser.id).map((store) => (
                <Store key={store.id} store={store} ></Store>
              ))}
          </div>
      </div>
    )
  }
  

  if (currentUser) {
    if (isLoading) {
      return (
        <div>
          <p>Loading ...</p>
        </div>
      )
    } else {
      return (
        <div>
          {currentUser.isAdmin ? <AdminStorePage/> : 
          <div className="container">
              {stores.map((store) => (
                <Store key={store.id} store={store} ></Store>
              ))}
          </div>}
        </div>
      )
    }
  } else {
    return (
      <>
        <h1>Unauthorized!</h1>
        <p>Please log in first</p>
      </>
    )
  }
}

export default Storelist
