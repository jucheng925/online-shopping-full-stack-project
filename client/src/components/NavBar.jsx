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

  const displaybuttons = () =>{
    return (
    <>
      {currentUser.isAdmin ? null :
        <NavLink to="/mypurchases" className='nav-link'>
          My Purchases
        </NavLink>
      }
      <button className="nav-link" onClick={handleLogout}>
        Logout
      </button>

    </>
    )
  }

return (
    <nav style={{margin: 10}}>
      <NavLink to= "/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/stores" className="nav-link">
        Stores
      </NavLink>
      {currentUser ? displaybuttons() : null }
    </nav>
  )
}

export default NavBar
