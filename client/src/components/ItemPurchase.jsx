import React, {useState} from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import StyledButton from '../StyledButton';


const ItemPurchase = ({item, setShowPurchaseOption, onUpdateItem}) => {
  const [inputQuantity, setInputQuantity] = useState(0)

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
     .then((data) => onUpdateItem(data))
  }

  const handlePurchase = (e)=> {
    e.preventDefault();
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
        .then((data) => {
          handleInventory(data.item)
          setShowPurchaseOption(false)
          window.alert("Thank you for purchasing!!")
        })
      }
  }

  

  return (
    <div>
      {item.quantity === 0 ? <p>Sorry, out of stock </p> : 
        <>
          <form style={{all: "revert"}} onSubmit={handlePurchase}>
          <label htmlFor="amount">How many would you like to buy?  </label>
          <input style={{width: "75%"}} type="number" id="amount" min="0" max={item.quantity} value={inputQuantity} onChange={(e)=>setInputQuantity(e.target.value)}/>
          <StyledButton type="submit"
                  startIcon={<ThumbUpAltIcon/>} >
            Confirm Purchase
          </StyledButton>
          </form>
        </>
      }
    </div>
  )
}

export default ItemPurchase
