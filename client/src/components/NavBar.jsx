import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({currentUser}) => {
  const displayLogout = () =>{
    return currentUser ? (
      <NavLink to= "/logout" className="nav-link" style={{padding: 5}}>
      Logout
    </NavLink>
    ) :
    null
  }

  return (
    <nav style={{margin: 10}}>
      <NavLink to= "/" className="nav-link" style={{padding: 5}}>
        Home
      </NavLink>
      <NavLink to= "/signup" className="nav-link" style={{padding: 5}}>
        Signup
      </NavLink>
      {displayLogout()}
    </nav>
  )
}

export default NavBar
