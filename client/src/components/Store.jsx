import React from 'react'
import { Link } from 'react-router-dom'

const Store = ({store }) => {
  return (
    <div className="card">
        <Link to={`/stores/${store.id}`}>
        <img src={store.img_url} alt={`${store.store_name}`} />
        </Link>
        <h3>{store.store_name}</h3>
        <p>{store.description}</p>
    
    </div>
  )
}

export default Store
