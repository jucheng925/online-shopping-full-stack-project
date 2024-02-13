import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const ItemShow = ({item}) => {
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <div>
      <p style={{fontStyle:"italic"}}>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Inventory Available: {item.quantity}</p>
      <p><strong>Purchased {item.purchases.length} times </strong></p>
      {currentUser.isAdmin ? 
          <button onClick = {() => {navigate(`/stores/${item.store_id}/edititem`, {state: item})}}>Edit Item</button> 
          : <button>Buy Item</button>}
    </div>
  )
}

export default ItemShow
