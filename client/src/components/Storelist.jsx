import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Storelist = () => {
  const {currentUser} = useContext(UserContext)

  if (currentUser) {
    return (
      <div>
        List of Stores
      </div>
    )
  } else {
    return (
      <>
        <h1>Unauthorized!</h1>
        <p>Please log in first</p>
      </>
    )
  }
}

export default Storelist
