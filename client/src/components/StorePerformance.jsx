import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const StorePerformance = () => {
  const params = useParams()
  const [storePurchases, setStorePurchases] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {
    setIsLoading(true)
    fetch(`/api/purchases/stores/${params.id}`)
    .then(resp => resp.json())
    .then(data => {
      setStorePurchases(data)
      setIsLoading(false)
      })
  }, [params])



  if (isLoading) {
    return (
      <div>
        <p>Loading ...</p>
      </div>
    )
  } else {
    return (
      <div>
      <h3>Purchases Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Buyer</th>
            <th>Item Sold</th>
            <th>Quanity</th>
            <th>Total Earned</th>
          </tr>
        </thead>
        <tbody>
          {storePurchases.map((purchase) =>
            <tr key={purchase.id}>
              <td>{purchase.created_at}</td>
              <td>{purchase.user.username}</td>
              <td>{purchase.item.name}</td>
              <td>{purchase.quantity}</td>
              <td>${purchase.amt_spent}</td>
            </tr>)}
        </tbody>
      </table>
      </div>
    )
  }
}

export default StorePerformance
