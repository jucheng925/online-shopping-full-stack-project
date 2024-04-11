import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserContext'
import ItemPurchase from './ItemPurchase'
import ItemEditForm from './ItemEditForm'
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import StyledButton from '../StyledButton';

const ItemShow = ({item, onUpdateItem}) => {
  const {currentUser} = useContext(UserContext)
  const [showPurchaseOption, setShowPurchaseOption] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  return (
    <div>
      <p style={{fontStyle:"italic"}}>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Inventory Available: {item.quantity}</p>
      <p><strong>Purchased {item.purchases.length} times </strong></p>
      { showPurchaseOption ? <ItemPurchase item={item} onUpdateItem={onUpdateItem} /> : null}
      {currentUser.isAdmin ? 
            <StyledButton 
                    startIcon={<EditNoteIcon />}  
                    onClick={()=>setShowEditForm(!showEditForm)} >
               Edit Item
            </StyledButton>
          : <>
            {showPurchaseOption ? 
              <StyledButton 
                  style={{backgroundColor:"#bf4242"}}
                  startIcon={<CancelIcon/>} 
                  onClick={()=> setShowPurchaseOption(!showPurchaseOption)}>
                Cancel Transaction
              </StyledButton> :
              <StyledButton 
                    startIcon={<ShoppingCartIcon />} 
                    onClick={()=> setShowPurchaseOption(!showPurchaseOption)}>
                Buy Item
              </StyledButton>}
            </>}
      <div id={showEditForm ? 'overlay': 'nooverlay'}>
        <ItemEditForm item={item} showEditForm={showEditForm} setShowEditForm={setShowEditForm}/>
      </div>
    </div>
  )
}

export default ItemShow
