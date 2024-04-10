import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/UserContext'
import StorePurchases from './StorePurchases'


const StoresPurchasesList = () => {
  const {currentUser} = useContext(UserContext)
  let myStores = []

  if (currentUser) {
    myStores = currentUser.stores
    
    return ( 
      <div>
        <h2>Click on the store to see its performance/purchases history</h2>
        <div>
          {myStores.map((store) => <StorePurchases key={store.id} store={store}/>)}
        </div>
      </div>
    )
  }
}

export default StoresPurchasesList
