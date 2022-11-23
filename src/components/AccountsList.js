import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import { Box } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AccountsList() {

  const [rows, setRows] = useState([]);

  function getAccounts()
  {
    let url = "http://localhost:8080/api/accounts"
    axios.get(url)
      .then((res) => {
        console.log(res);
        setRows(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getAccounts();
    console.log("Fired")
  }, []);

  return (
    <Box component='div'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    <TableContainer sx={{ maxWidth: '80%' }} component={Paper} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: '',
        padding: '-20px 0px 20px -20px'
      }}>

          <Typography align="left" style={{
            fontSize: '32px',
            margin: '4px 520px 8px -360px'
          }}>
            Account List
          </Typography>


      <Table sx={{ maxWidth: '100%' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Account Number</StyledTableCell>
            <StyledTableCell align="right">Account Type</StyledTableCell>
            <StyledTableCell align="right">Balance</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.account_number}
              </StyledTableCell>
              <StyledTableCell align="right">{row.account_type}</StyledTableCell>
              <StyledTableCell align="right">{row.balance}</StyledTableCell>
              <StyledTableCell align="right">
                <Button color="success" variant="contained"
                  disabled={row.account_type === "savings" ? parseFloat(row.balance) > 0 ? false : true : parseFloat(row.balance) > -500 ? false : true}
                  onClick={() => alert("Success")}
                >
                  Withdraw
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
