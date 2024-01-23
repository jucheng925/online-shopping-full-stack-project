import React, {useContext, useEffect} from 'react'
import Login from '../components/Login'
import { UserContext } from '../context/UserContext';

const Home = () => {
  const {login, currentUser} = useContext(UserContext)
  useEffect(() => {
    fetch("/api/check_session").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => login(user));
      }
    });
  }, []);

  return (
    <div>
      <h1>HOME</h1>
      <h1>ONLINE SHOPPING</h1>
      <p>Where you can list items for sale as an Admin or shop for items</p>
      {currentUser ? null: <Login />}
    </div>
  )
}

export default Home
