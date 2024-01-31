import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Store from './Store'
import StoreForm from './StoreForm'

const Storelist = () => {
  const {currentUser} = useContext(UserContext)
  const [stores, setStores] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(()=> {
    fetch("/api/stores")
    .then(resp => resp.json())
    .then(data => setStores(data))
  }, [currentUser])

  const showAdminForm = () => {
    return currentUser.isAdmin ? (
      <button style={{width:"40%"}} onClick={()=>setShowForm(!showForm)}>{showForm ? "Close Form" : "Create a New Store"}</button>
    ) : null
  }

  const addStore = (newStore) =>{
    const newArray = [...stores, newStore]
    setStores(newArray)
    setShowForm(false)
  }

  if (currentUser) {
    return (
      <div>
        {showAdminForm()}
        {showForm ? <StoreForm addStore={addStore}/> : null}

        <div className="container">
            {stores.map((store) => (
              <Store key={store.id} store={store}></Store>
            ))}
        </div>
      </div>
    )
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
