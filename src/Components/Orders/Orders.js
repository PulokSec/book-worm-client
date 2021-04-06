import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { ListSubheader } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: '0 3px 5px 2px gray',
  },
}));

const Orders = () => {
  const classes = useStyles();
  const [booked,setBooked] = useState([]);
  const [status,setStatus] = useState('idle');
  const {loggedInUser} = useContext(UserContext);

  useEffect(()=>{
    setStatus('pending')
    fetch('https://mysterious-mountain-99777.herokuapp.com/order?email='+loggedInUser.email)
    .then(res => res.json())
    .then(data =>{
      setStatus('resolved')
      setBooked(data);
    })
  },[setBooked,loggedInUser.email])

  if(status === 'pending'){
    return <div className="d-flex justify-content-center align-items-center mt-5"><CircularProgress animation="border" role="status">
    <span className="sr-only d-flex justify-content-center">Loading...</span>
  </CircularProgress>
  </div>
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <List component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader  component="div" id="nested-list-subheader">
          Your Orders
        </ListSubheader>
      } dense className={classes.root }>
      {
    booked?.map(booking => {
      return(
    <ListItem >
            <ListItemAvatar>
              <Avatar
                src={booking.cart[0].imageURL
                }
              />
            </ListItemAvatar>
            <ListItemText primary={booking.cart[0].name} secondary={`Author:${booking.cart[0].author} Price:${booking.total}$ Date: ${booking.date.orderDate}`}/>
          </ListItem>
      );
        })}
    </List>
    </div>
    
  );
};

export default Orders;