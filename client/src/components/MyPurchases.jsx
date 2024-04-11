import React, {useContext } from 'react'
import { UserContext } from '../context/UserContext'
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


const MyPurchases = () => {
  const {currentUser} = useContext(UserContext)

  let myPurchases = []
  if(currentUser) {
    myPurchases = currentUser.purchases

    return (
      <TableContainer component={Paper} sx={{bgcolor:blueGrey[500], mt:5}}>
        <h3>My Purchases Summary</h3>
        <Table sx={{ minWidth: 650 }} >
            <TableHead>
              <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Store</StyledTableCell>
              <StyledTableCell>Item Brought</StyledTableCell>
              <StyledTableCell>Quanity</StyledTableCell>
              <StyledTableCell>Total Spent</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myPurchases.map((purchase) =>
              <StyledTablerow key={purchase.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{purchase.created_at}</TableCell>
                <TableCell>{purchase.item.store.store_name}</TableCell>
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

export default MyPurchases
