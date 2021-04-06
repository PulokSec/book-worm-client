import { Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const Checkout = (props) => {
  const books = props.book;
  const {_id,name,author,price,imageURL
  } = books ;


  return (
    <>
    <ListItem button>
            <ListItemAvatar>
              <Avatar
                src={imageURL
                }
              />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={`Author:${author} Price:${price}$`}/>
            <ListItemSecondaryAction>
            <RemoveCircleOutlineIcon className="mb-2" onClick={() => props.removeFromCart(_id)} variant="primary"></RemoveCircleOutlineIcon>
            </ListItemSecondaryAction>
          </ListItem>
    </>
  );
};

export default Checkout;