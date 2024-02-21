import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';


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
      <TableContainer sx={{bgcolor: 'grey'}}>
        <h3>Purchases Summary</h3>
        <Table sx={{ minWidth: 650 }} >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Buyer</TableCell>
              <TableCell>Item Sold</TableCell>
              <TableCell>Quanity</TableCell>
              <TableCell>Total Earned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storePurchases.map((purchase) =>
              <TableRow key={purchase.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{purchase.created_at}</TableCell>
                <TableCell>{purchase.user.username}</TableCell>
                <TableCell>{purchase.item.name}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>${purchase.amt_spent}</TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default StorePerformance
