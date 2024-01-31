import React, {useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import AdminButton from './AdminButton'
import Item from './Item'

const ItemsList = () => {
  const {currentUser} = useContext(UserContext)
  const params = useParams()
  const [items, setItems] = useState([])

  useEffect(()=> {
    fetch(`/api/stores/${params.id}`)
    .then(resp => resp.json())
    .then(data => setItems(data))
  },[params.id])

  const showAdminButton = ()=> currentUser.isAdmin ? <AdminButton/> : null
  
  const isEmptyStore = ()=> {
    if (!items.length) {
      return <p>Sorry, no items available right now. </p>
    } else {
      return items.map((item) => (
        <Item key ={item.id} item={item} />
      ))
    }
  }

  return (
    <>
      {showAdminButton()}
      <div className='container'>
        {isEmptyStore()}
      </div>
    </>
  )
}

export default ItemsList
