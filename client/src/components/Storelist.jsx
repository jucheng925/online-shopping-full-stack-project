import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Store from './Store'

const Storelist = () => {
  const {currentUser} = useContext(UserContext)
  const [stores, setStores] = useState([])

  useEffect(()=> {
    fetch("/api/storeslist")
    .then(resp => resp.json())
    .then(data => setStores(data))
  }, [currentUser])

  if (currentUser) {
    return (
      <div className="container">
          {stores.map((store) => (
            <Store key={store.id} store={store}></Store>
          ))}
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
