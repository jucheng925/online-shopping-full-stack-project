import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const ItemPurchase = ({item, setShowItemPurchase}) => {
  const [inputQuantity, setInputQuantity] = useState(0)
  const navigate = useNavigate()

  const handleInventory = (item)=> {
    fetch(`/api/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
         "Accept" : "application/json"
      },
      body: JSON.stringify({quantity: item.quantity - inputQuantity}),
     })
     .then(resp => resp.json())
     .then(() => navigate(`/stores/${item.store_id}`))
  }

  const handlePurchase = ()=> {
    if (inputQuantity === 0) {
      window.alert("Quantity to buy can not be 0. Please try again!")
    } else {
      fetch('/api/purchases', {
        method: "POST",
        headers: {
         "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify({
          item_id : item.id,
          quantity: inputQuantity,
          amt_spent: item.price * inputQuantity
          }),
        })
        .then(resp => resp.json())
        .then(data => {
          handleInventory(data.item)
          setShowItemPurchase(false)
        })
      }
  }

  

  return (
    <div>
        <label htmlFor="amount">How many would you like to buy?  </label>
        <input type="number" id="amount" min="0" max={item.quantity} value={inputQuantity} onChange={(e)=>setInputQuantity(e.target.value)}/>
        <button onClick={handlePurchase}>Confirm Purchase</button>
    </div>
  )
}

export default ItemPurchase
