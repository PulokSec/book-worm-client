import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import Checkout from '../Checkout/Checkout';
import { Link } from 'react-router-dom';
import { List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: '0 3px 5px 2px gray',
  },
}));
const Review = () => {
  const {cart,setCart,loggedInUser} = useContext(UserContext);
  const total = cart.reduce((total,prd)=> total + parseInt(prd.price), 0);
  var today = new Date();
  const [date,setDate] = useState({ orderDate : today,
  orderTime : today.getHours() + ":" + today.getMinutes() });


  const removeFromCart = (id)=>{
    const newCart = cart.filter(bk => bk._id !== id);
    setCart(newCart);
  }
  const handleOrder = ()=>{
    const newOrder = {loggedInUser,date,cart,total}
    fetch('https://mysterious-mountain-99777.herokuapp.com/addOrder',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newOrder)
    })
    .then(res => res.json())
    .then(data =>{
    })
  }

  const classes = useStyles();
 
  return (
    <div className="w-60 mt-5 d-flex justify-content-center align-items-center">
      
<List dense className={classes.root}>
{
 cart.map(book => <Checkout removeFromCart = {removeFromCart} key={book._id} book={book}></Checkout>)
}
<div className="d-flex justify-content-center align-items-center">
   <h5 className="title mr-4">Total Price: {total} $</h5>
   <Link onClick={handleOrder} to="/orders" className="btn btn-primary mb-2" ><CheckCircleOutlinedIcon/> Checkout</Link>
</div>
</List>
      
    </div>
  );
};

export default Review;

