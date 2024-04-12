import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'

const Logout = () => {
  const {currentUser, logout} = useContext(UserContext)

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
    }).then(() => logout())
  }

  return (
    <button className="nav-link" onClick={handleLogout}>
        Logout
    </button>
  )
}

export default Logout
