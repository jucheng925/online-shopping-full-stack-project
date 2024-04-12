import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import Store from './Store'
import StoreForm from './StoreForm'
import { Grid } from '@mui/material'
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CloseIcon from '@mui/icons-material/Close';
import StyledButton from '../StyledButton'


const Storelist = () => {
  const {currentUser} = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [stores, setStores] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(()=> {
    fetch("/api/stores")
    .then(resp => resp.json())
    .then(data => {
          setStores(data);
          setIsLoading(false);
        })
  }, [])


  const addStore = (newStore)=> {
    const newArray = [...stores, newStore]
    setStores(newArray)
    setShowForm(false)
  }

  const AdminStorePage = () => {
    return (
      <>
        {showForm ? 
          <StyledButton 
            style={{width:"60%", margin: "2%", backgroundColor: "#bf4242"}} 
            size="large" startIcon ={<CloseIcon/>}
            onClick={()=>setShowForm(!showForm)}>
          Close Form
          </StyledButton> :
          
          <StyledButton  
            style={{ width:"60%", margin: "2%"}} 
            size="large" startIcon ={<AddBusinessIcon/>}
            onClick={()=>setShowForm(!showForm)}>
          Create a New Store
          </StyledButton> 
        }

        {showForm ? <StoreForm addStore={addStore}/> : null}
        <h2><strong>My Stores</strong></h2>
        <Grid container spacing={3}>
          {stores.filter((store) => store.user_id === currentUser.id).map((store) => (
            <Grid key={store.id} item xs={4}>
              <Store key={store.id} store={store}></Store>
            </Grid>
          ))}
        </Grid>
      </>
    )
  }

  const ShopperPage = () => {
    return( 
      <>
        <h2><strong>Available Stores</strong></h2>
        <Grid container spacing={3}>
          {stores.map((store) => (
            <Grid key={store.id} item xs={4}>
              <Store key={store.id} store={store}></Store>
            </Grid>
          ))}
        </Grid>
      </>
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
        <>
          {currentUser.isAdmin ? <AdminStorePage/> : <ShopperPage/> }
        </>
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
