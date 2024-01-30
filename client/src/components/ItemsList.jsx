import React, {useContext } from 'react'
import { UserContext } from '../context/UserContext'
import AdminButton from './AdminButton'

const ItemsList = () => {
  const {currentUser} = useContext(UserContext)
  return (
    <>
      {currentUser.isAdmin ? <AdminButton/> : null}
      <div>
          A list of items
      </div>
    </>
  )
}

export default ItemsList
