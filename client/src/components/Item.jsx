import React, {useState, useContext} from 'react'
import { UserContext } from '../context/UserContext'
import ItemShow from './ItemShow'
import { IconButton, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

const Item = ({item, handleDelete, onUpdateItem}) => {
  const {currentUser} = useContext(UserContext)
  const [showMoreDetails, setShowMoreDetails] = useState(false)


  return (
    <div>
      <img onClick={()=>setShowMoreDetails(!showMoreDetails)} src={item.img_url} alt={`${item.name}`} />
      <h3><strong>{item.name}</strong></h3>
      <p>Click on image {showMoreDetails ? "to hide" : "for more"} details </p>
      {showMoreDetails ? <ItemShow item={item} onUpdateItem={onUpdateItem}/> : null}
      {currentUser.isAdmin ? (
        <Tooltip title="Delete">
          <IconButton width='20%' onClick={()=>handleDelete(item)}>
            <DeleteIcon fontSize='large' color='error' />
          </IconButton>
          {/* <button style ={{backgroundColor: "red", width: "20%"}} onClick={()=>handleDelete(item)}>Delete</button> */}
        
        </Tooltip>
        
        ): null}

    </div>
  )
}

export default Item

