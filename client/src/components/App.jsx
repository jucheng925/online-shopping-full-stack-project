import { useState } from 'react'
import '../App.css'
import { Outlet} from "react-router-dom"
import NavBar from './NavBar'


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (user) => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  const logout = () => {
    setCurrentUser(null);
    setLoggedIn(false);
  }



  return (
    <>
      <header>
        <NavBar currentUser={currentUser}/>
      </header>
      <Outlet/>
    </>
  )
}

export default App
