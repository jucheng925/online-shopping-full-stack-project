import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import ItemPurchase from './ItemPurchase'
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import {StyledButton, RedStyledButton} from '../StyledButton';

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
            <StyledButton 
                    startIcon={<EditNoteIcon />}  
                    onClick = {() => {navigate(`/stores/${item.store_id}/edititem`, {state: item})}}>
               Edit Item
            </StyledButton>
          : <>
            {showPurchaseOption ? 
              <RedStyledButton 
                  startIcon={<CancelIcon/>} 
                  onClick={()=> setShowPurchaseOption(!showPurchaseOption)}>
                Cancel Transaction
              </RedStyledButton> :
              <StyledButton 
                    startIcon={<ShoppingCartIcon />} 
                    onClick={()=> setShowPurchaseOption(!showPurchaseOption)}>
                Buy Item
              </StyledButton>}
            </>}
    </div>
  )
}

export default ItemShow
