import React from 'react'
import Item from './Item'


const ItemsList = ({items, onDeleteItem, onUpdateItem }) => {

  const handleDelete = (item) => {
    fetch(`/api/items/${item.id}`, {
      method: "DELETE",
    }).then(()=> onDeleteItem(item.id))
  }


  return (
    <>
      <div className='container'>
        {items.length == 0 ? <p>Sorry, no items available right now. </p> : 
          items.map((item) => (
            <Item key ={item.id} item={item} onUpdateItem={onUpdateItem} handleDelete={handleDelete}  />
            ))
        }
      </div>
    </>
  )
}

export default ItemsList
