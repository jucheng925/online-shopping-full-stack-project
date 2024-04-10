import React from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, styled } from '@mui/material';
import { blueGrey } from '@mui/material/colors';


const StyledTablerow = styled(TableRow) ({
  fontSize: 14,
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

const StorePerformance = ({store}) => {

  const storeItems = store.items
  let storePurchases = []
  storeItems.forEach(item => {
    console.log(item)
    console.log(item.purchases)
    storePurchases = storePurchases.concat(item.purchases)
  });
  console.log(storePurchases)


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

export default StorePerformance
