import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Store from './Store'
import StoreForm from './StoreForm'
import { Container, Grid } from '@mui/material'


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
          <h2><strong>My Stores</strong></h2>
          <Grid container spacing={3}>
            {stores.filter((store) => store.user_id === currentUser.id).map((store) => (
                <Grid key={store.id} item xs={4}>
                  <Store key={store.id} store={store}></Store>
                </Grid>
              ))}
          </Grid>
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
          <Grid container spacing={3}>
              {stores.map((store) => (
                <Grid key={store.id} item xs={4}>
                  <Store key={store.id} store={store} ></Store>
                </Grid>
              ))}
          </Grid>}
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
