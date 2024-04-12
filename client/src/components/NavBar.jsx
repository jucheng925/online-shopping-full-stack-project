import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Logout from './Logout'

const NavBar = () => {
  const {currentUser} = useContext(UserContext)

  const displaybuttons = () =>{
    return (
    <>
      {currentUser.isAdmin ? 
        <NavLink to="/storepurchases" className='nav-link'>
          Store Purchases
        </NavLink>:
        <NavLink to="/mypurchases" className='nav-link'>
          My Purchases
        </NavLink>
      }
      <Logout/>
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
