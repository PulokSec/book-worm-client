import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const ManageBooks = (props) => {
  const book = props.book;
  const {loggedInUser,date,total,cart,_id} = book;
  const [alert,setAlert] = useState(false);
  const classes = useStyles();
  function deleteOrder(id){
    const row = document.getElementById(id);
    row.innerHTML = "";
    fetch(`https://mysterious-mountain-99777.herokuapp.com/deleteOrder/${id}`,{
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(result =>{
        setAlert(true)
    })
  }
  return (
    <>   
        <StyledTableRow id={_id}>
              <StyledTableCell component="th" scope="row">{loggedInUser.displayName}</StyledTableCell>
              <StyledTableCell align="right">{cart[0].name}</StyledTableCell>
              <StyledTableCell align="right">{cart[0].author}</StyledTableCell>
              <StyledTableCell align="right">{total}$</StyledTableCell>
              <StyledTableCell align="right">{date.orderDate}</StyledTableCell>
              <StyledTableCell align="right">
              <Link aria-current="page"><FontAwesomeIcon icon={faEdit} /></Link>
              </StyledTableCell>
              <StyledTableCell align="right"><Link onClick={() => deleteOrder(_id)} className="nav-link active" aria-current="page"><FontAwesomeIcon icon={faTrashAlt} /></Link></StyledTableCell>
            </StyledTableRow>
            {alert && 
        <div className={classes.root}>
        <Alert severity="error">
        <AlertTitle>Deleted</AlertTitle>
        Order Deleted — <strong>check it out!</strong>
      </Alert>
        </div>
        }
    </>
  );
};

export default ManageBooks;