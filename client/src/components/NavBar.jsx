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

if (currentUser) {
  return (
        <nav style={{margin: 10}}>
        <NavLink to= "/" className="nav-link">
          Home
        </NavLink>
        <NavLink to= "/signup" className="nav-link">
          Signup
        </NavLink>
        <button className="nav-link" onClick={handleLogout}>
          Logout
        </button>
        </nav>
  );
} else {
    return (
    <nav style={{margin: 10}}>
      <NavLink to= "/" className="nav-link">
        Home
      </NavLink>
      <NavLink to= "/signup" className="nav-link">
        Signup
      </NavLink>
    </nav>
    );
}}

export default NavBar
