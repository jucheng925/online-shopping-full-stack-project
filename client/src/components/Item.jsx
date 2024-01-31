import React from 'react'

const Item = ({item}) => {
  return (
    <div>
      <img src={item.img_url} alt="item" />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      
    </div>
  )
}

export default Item
