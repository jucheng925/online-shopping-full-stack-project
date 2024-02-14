import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import ItemPurchase from './ItemPurchase'

const ItemShow = ({item, updatedItem}) => {
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate()
  const [showItemPurchase, setShowItemPurchase] = useState(false)

  return (
    <div>
      <p style={{fontStyle:"italic"}}>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Inventory Available: {item.quantity}</p>
      <p><strong>Purchased {item.purchases.length} times </strong></p>
      {showItemPurchase ? <ItemPurchase item={item} updatedItem={updatedItem} setShowItemPurchase={setShowItemPurchase}/> : null}
      {currentUser.isAdmin ? 
          <button onClick = {() => {navigate(`/stores/${item.store_id}/edititem`, {state: item})}}>Edit Item</button> 
          : <button onClick={()=> setShowItemPurchase(!showItemPurchase)}>{showItemPurchase? "Cancel Transaction" : "Buy Item"}</button>}
    </div>
  )
}

export default ItemShow
