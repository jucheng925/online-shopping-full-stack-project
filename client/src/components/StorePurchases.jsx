import React, {useContext, useEffect, useState} from 'react'
import { Outlet, NavLink} from "react-router-dom"
import { UserContext } from '../context/UserContext'


const StorePurchases = () => {
  const {currentUser} = useContext(UserContext)
  const [myStore, setMyStore] = useState([])

 
  useEffect(()=> {
    if (currentUser) {
      fetch(`/api/stores/owner/${currentUser.id}`)
      .then(resp => resp.json())
      .then(data => setMyStore(data))
    }
  },[currentUser])
    

  return ( 
    <div>
      <div>
        <h2>Click on the store to see its performance/purchases history</h2>
      </div>
      <div>
        {myStore.map((store) => (
          <li key={store.id}>
            <NavLink to={`/storepurchases/${store.id}`}>{store.store_name}</NavLink>
            <br />
          </li>
        ))}
        <Outlet/>
      </div>
    </div>
  )
}

export default StorePurchases
