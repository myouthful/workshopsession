import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';

// ...existing imports...

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#D9DCE7',
      color: '#000000',
      fontWeight: 400,
      fontSize: '13px',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: '13px',
      fontWeight: 300, // This makes the text thin
      borderBottom: '1px solid #D9DCE7', // This adds the line separator
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: '#FFFFFF', // Default white background
    '&.debit-row': {
      backgroundColor: '#D9DCE7',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '& td, & th': {
      borderColor: '#D9DCE7',
    },
  }));
  
  function createData(account, name, transactionId, date, description, amount, type) {
    return { account, name, transactionId, date, description, amount, type };
  }
  
  const rows = [
    createData('1234567890', 'John Doe', 'TXN001', '2024-03-01', 'Online Purchase', 150.00, 'credit'),
    createData('1234567891', 'Jane Smith', 'TXN002', '2024-03-01', 'Salary Credit', 2500.00, 'debit'),
    createData('1234567892', 'Mike Johnson', 'TXN003', '2024-03-01', 'ATM Withdrawal', 300.00, 'credit'),
    createData('1234567893', 'Sarah Williams', 'TXN004', '2024-03-01', 'Bank Transfer', 450.00, 'debit'),
    createData('1234567894', 'Robert Brown', 'TXN005', '2024-03-01', 'Bill Payment', 200.00, 'credit'),
  ];
  
  export default function TransactionTable() {
    return (
      <div className="px-[64px]">
        <TableContainer component={Paper} sx={{ 
        borderRadius: 0, 
        boxShadow: 'none',
        '& .MuiPaper-root': {
          borderRadius: 0,
          boxShadow: 'none'
        }
      }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Account</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Transaction Id</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Debit</StyledTableCell>
                <StyledTableCell>Credit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
              <StyledTableRow 
                key={row.transactionId}
                className={row.type === 'debit' ? 'debit-row' : ''}
              >
                <StyledTableCell>{row.account}</StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.transactionId}</StyledTableCell>
                <StyledTableCell>{row.date}</StyledTableCell>
                <StyledTableCell>{row.description}</StyledTableCell>
                <StyledTableCell sx={{ color: '#880000' }}>
                  {row.type === 'debit' ? `$ ${row.amount}` : '-'}
                </StyledTableCell>
                <StyledTableCell sx={{ color: '#1B4B2E' }}> {/* Dark green color for credit */}
                  {row.type === 'credit' ? `$ ${row.amount}` : '-'}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }