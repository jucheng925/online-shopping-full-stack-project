import React from 'react'
import Item from './Item'
import { Grid } from '@mui/material'


const ItemsList = ({items, onDeleteItem, onUpdateItem }) => {

  const handleDelete = (item) => {
    fetch(`/api/items/${item.id}`, {
      method: "DELETE",
    }).then(()=> onDeleteItem(item.id))
  }


  return (
      <div className='container'>
      {items.length == 0 ? <p>Sorry, no items available right now. </p> : 
      <Grid container spacing={3}>
          {items.map((item) => (
            <Grid key={item.id} item xs={4}> 
              <Item key ={item.id} item={item} onUpdateItem={onUpdateItem} handleDelete={handleDelete}  />
            </Grid> 
          ))}
      </Grid>
      }
    </div>
  )
}

export default ItemsList
