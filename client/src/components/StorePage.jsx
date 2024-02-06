import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { Notfound } from './ErrorPage'
import AdminButton from './AdminButton'

const StorePage = () => {
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const store = location.state
  
  const deleteStore =()=>{
    fetch(`/api/stores/${store.id}`, {
    method: "DELETE",
    }).then(()=>navigate('/stores'))
  }


  if (store && currentUser) {
    return (
      <>
        {currentUser.isAdmin ? <AdminButton deleteStore={deleteStore} store={store}/>: null}
        <h2>{store.store_name}</h2>
        <p style={{fontStyle:"italic"}}>{store.description}</p>
        <div>
          A list of items from the store
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
