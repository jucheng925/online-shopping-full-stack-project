import React, {useContext, useState} from 'react'
import { Outlet, Link} from "react-router-dom"
import { UserContext } from '../context/UserContext'

const StorePurchases = () => {
    const {currentUser} = useContext(UserContext)
    
    
  return (
    <div>
        <Link to={`/storepurchases/2`}>Store 2</Link>
        <br />
        <Link to={`/storepurchases/3`}>Store 3</Link>
      <Outlet/>
    </div>
  )
}

export default StorePurchases
