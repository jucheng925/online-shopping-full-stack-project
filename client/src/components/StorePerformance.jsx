import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';


const StyledTablerow = styled(TableRow) ({
  '&:nth-of-type(odd)': {
    backgroundColor: blueGrey[300],
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
})

const StyledTableCell = styled(TableCell)({
  backgroundColor: blueGrey[800],
  color: "white",
  fontWeight: "bold",
  fontSize: 16
})

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
      <TableContainer component={Paper} sx={{bgcolor:blueGrey[500], mt:5}}>
        <h3>Purchases Summary</h3>
        <Table sx={{ minWidth: 650 }} >
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Buyer</StyledTableCell>
              <StyledTableCell>Item Sold</StyledTableCell>
              <StyledTableCell>Quanity</StyledTableCell>
              <StyledTableCell>Total Earned</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storePurchases.map((purchase) =>
              <StyledTablerow key={purchase.id}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{purchase.created_at}</TableCell>
                <TableCell>{purchase.user.username}</TableCell>
                <TableCell>{purchase.item.name}</TableCell>
                <TableCell>{purchase.quantity}</TableCell>
                <TableCell>${purchase.amt_spent}</TableCell>
              </StyledTablerow>)}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default StorePerformance
