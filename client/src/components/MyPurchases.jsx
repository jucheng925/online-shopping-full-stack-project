import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../context/UserContext'

const MyPurchases = () => {
  const {currentUser} = useContext(UserContext)
	const [myPurchases, setMyPurchases] = useState([])

	useEffect(()=> {
		if (currentUser) {
			fetch(`api/purchases/${currentUser.id}`)
			.then(resp => resp.json())
			.then(data => setMyPurchases(data))
		}
	}, [])

  return (
    <div>
      <h3>Past purchases Summary</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Item Brought</th>
            <th>Quanity</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
					{myPurchases.map((purchase) =>
						<tr key={purchase.id}>
							<td>{purchase.created_at}</td>
							<td>{purchase.item.name}</td>
							<td>{purchase.quantity}</td>
							<td>${purchase.amt_spent}</td>
						</tr>)}
        </tbody>
      </table>
      
    </div>
  )
}

export default MyPurchases
