import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import AdminButton from './AdminButton'
import Item from './Item'
import { Notfound } from './ErrorPage'

const ItemsList = () => {
  const {currentUser} = useContext(UserContext)
  const params = useParams()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [notFound, setNotFound] = useState(false)

  useEffect(()=> {
    fetch(`/api/stores/${params.id}`)
    .then(resp => {
      if (resp.status == 404) {
        setNotFound(true)
      } else {
        resp.json()
        .then(data => setItems(data))
      }
    })
  },[params.id])

  
  const isEmptyStore = ()=> {
    if (!items.length && !notFound) {
      return <p>Sorry, no items available right now. </p>
    } else {
      return items.map((item) => (
        <Item key ={item.id} item={item} />
      ))
    }
  }

  const showAdminButton = ()=> {
    if (currentUser && !notFound) {
      if (currentUser.isAdmin) {
        return <AdminButton deleteStore={deleteStore}/>
      }
    } else {
        return null
    }
  }

  const deleteStore =()=>{
    fetch(`/api/stores/${params.id}`, {
    method: "DELETE",
  }).then(()=>navigate('/stores'))
  }


  return (
    <>
      {notFound ? <Notfound /> : null}
      {showAdminButton()}
      <div className='container'>
        {isEmptyStore()}
      </div>
    </>
  )
}

export default ItemsList
