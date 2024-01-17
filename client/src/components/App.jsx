import { useState } from 'react'
import '../App.css'
import Signup from './Signup'
import Login from './Login'

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
      <div>
        <Signup></Signup>
        <Login></Login>
      </div>
    </>
  )
}

export default App
