import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Item from './Item'


const ItemsList = ({items, deleteItem}) => {
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleDelete = (item) => {
    fetch(`/api/items/${item.id}`, {
      method: "DELETE",
    }).then(()=> deleteItem(item.id))
  }


  const displayItems = ()=> {
    if (items.length == 0) {
      return <p>Sorry, no items available right now. </p>
    } else {
      return items.map((item) => (
        <Item key ={item.id} item={item} handleDelete={handleDelete} />
      ))
    }
  }


  return (
    <>
      <div className='container'>
        {displayItems()}
      </div>
    </>
  )
}

export default ItemsList
