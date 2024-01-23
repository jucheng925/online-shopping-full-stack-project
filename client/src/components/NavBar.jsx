import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const NavBar = () => {
  const {currentUser, logout} = useContext(UserContext)

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => logout())
  }

return (
    <nav style={{margin: 10}}>
      <NavLink to= "/" className="nav-link">
        Home
      </NavLink>
      <NavLink to= "/signup" className="nav-link">
        Signup
      </NavLink>
      <NavLink to="/stores" className="nav-link">
        Stores
      </NavLink>
      {currentUser ? <button className="nav-link" onClick={handleLogout}>
        Logout
      </button> : null }
    </nav>
  )
}

export default NavBar
