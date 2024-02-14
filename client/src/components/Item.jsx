import React, {useState, useContext} from 'react'
import { UserContext } from '../context/UserContext'
import ItemShow from './ItemShow'

const Item = ({item, handleDelete}) => {
  const {currentUser} = useContext(UserContext)
  const [showMoreDetails, setShowMoreDetails] = useState(false)


  const handleClick = () =>{
    setShowMoreDetails(!showMoreDetails)
  }

  return (
    <div>
      <img onClick={handleClick} src={item.img_url} alt={`${item.name}`} />
      <h3>{item.name}</h3>
      <p>Click on image {showMoreDetails ? "to hide" : "for more"} details </p>
      {showMoreDetails ? <ItemShow item={item}/> : null}
      {currentUser.isAdmin ? <button style ={{backgroundColor: "red", width: "20%"}} onClick={()=>handleDelete(item)}>Delete</button> : null}

    </div>
  )
}

export default Item
