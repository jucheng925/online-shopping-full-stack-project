import React from 'react'
import { redirect } from 'react-router-dom'

const Item = ({item, handleDelete}) => {
  return (
    <div>
      <img src={item.img_url} alt="item" />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <button style ={{backgroundColor: "red", width: "20%"}} onClick={()=>handleDelete(item)}>Delete</button>
      
    </div>
  )
}

export default Item
