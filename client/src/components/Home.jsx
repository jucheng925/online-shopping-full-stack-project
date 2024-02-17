import React, {useContext, useEffect} from 'react'
import Login from './Login'
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { currentUser} = useContext(UserContext)

  return (
    <div>
      <h1>ONWARD</h1>
      <h1>ONLINE SHOPPING</h1>
      <p>Where you can list items for sale as an Admin or shop for items</p>
      {currentUser ? null: <Login />}
    </div>
  )
}

export default Home
