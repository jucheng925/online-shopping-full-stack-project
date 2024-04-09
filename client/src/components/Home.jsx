import React, {useContext, useEffect} from 'react'
import Login from './Login'
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { currentUser} = useContext(UserContext)

  return (
    <div>
      <h1>ONWARDS</h1>
      <h1>ONLINE SHOPPING</h1>
      <h3>Where you can list items for sale as an Admin or shop for items</h3>
      {currentUser ? 
          <p>Welcome, {currentUser.username}!</p>
          : <Login />}
    </div>
  )
}

export default Home
