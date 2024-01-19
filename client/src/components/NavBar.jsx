import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav style={{margin: 10}}>
      <Link to= "/" style={{padding: 5}}>
        Home
      </Link>
      <Link to= "/signup" style={{padding: 5}}>
        Signup
      </Link>

    </nav>
  )
}

export default NavBar
