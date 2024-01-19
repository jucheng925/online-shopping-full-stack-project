import { useState } from 'react'
import '../App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
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

  function NoMatch() {
    return (
      <h2> 404: Page Not Found </h2>
    )
  }

  return (
    <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path ="/signup" element={<Signup/>} />
          <Route path ="*" element={<NoMatch/>} />
        </Routes>
    </Router>
  )
}

export default App
