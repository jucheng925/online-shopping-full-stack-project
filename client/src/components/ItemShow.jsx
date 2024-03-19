import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import ItemPurchase from './ItemPurchase'
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';

const ItemShow = ({item, onUpdateItem}) => {
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate()
  const [showPurchaseOption, setShowPurchaseOption] = useState(false)

  return (
    <div>
      <p style={{fontStyle:"italic"}}>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Inventory Available: {item.quantity}</p>
      <p><strong>Purchased {item.purchases.length} times </strong></p>
      { showPurchaseOption ? <ItemPurchase item={item} onUpdateItem={onUpdateItem} setShowPurchaseOption={setShowPurchaseOption}/> : null}
      {currentUser.isAdmin ? 
            <Button variant="contained" 
                    size="medium" 
                    style={{width:"40%", margin:"15px 0"}} 
                    color="success" startIcon={<EditNoteIcon />}  
                    onClick = {() => {navigate(`/stores/${item.store_id}/edititem`, {state: item})}}>
               Edit
            </Button>
          : <>
            {showPurchaseOption ? 
              <Button variant="contained" 
                  size="medium" 
                  style={{width:"40%"}} 
                  color="success" 
                  startIcon={<CancelIcon/>} 
                  onClick={()=> setShowPurchaseOption(!showPurchaseOption)}>
                Cancel Transaction
              </Button> :
              <Button variant="contained" 
                    size="medium" 
                    style={{width:"40%"}} 
                    color="success" 
                    startIcon={<ShoppingCartIcon />} 
                    onClick={()=> setShowPurchaseOption(!showPurchaseOption)}>
                Buy Item
              </Button>}
            </>}
    </div>
  )
}

export default ItemShow
