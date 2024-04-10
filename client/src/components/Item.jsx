import React, {useState, useContext} from 'react'
import { UserContext } from '../context/UserContext'
import ItemShow from './ItemShow'
import StyledButton from '../StyledButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = ({item, onDeleteItem, onUpdateItem}) => {
  const {currentUser} = useContext(UserContext)
  const [showMoreDetails, setShowMoreDetails] = useState(false)

  const handleDelete = (item) => {
    fetch(`/api/items/${item.id}`, {
      method: "DELETE",
    }).then(()=> onDeleteItem(item.id))
  }


  return (
    <>
      <img onClick={()=>setShowMoreDetails(!showMoreDetails)} src={item.img_url} alt={`${item.name}`} />
      <h3><strong>{item.name}</strong></h3>
      <p>Click on image {showMoreDetails ? "to hide" : "for more"} details </p>
      {showMoreDetails ? <ItemShow item={item} onUpdateItem={onUpdateItem}/> : null}
      {currentUser.isAdmin ? (
          <StyledButton style={{backgroundColor:"#bf4242"}} startIcon={<DeleteIcon />} onClick={()=>handleDelete(item)}>
            Delete
          </StyledButton>
        ): null}

    </>
  )
}

export default Item

