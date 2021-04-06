import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import ManageBooks from '../Manage Books/ManageBooks';
import { UserContext } from '../../App';
import Tab from 'react-bootstrap/Tab'
import { Col, Nav, Row } from 'react-bootstrap';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
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


const Admin = () => {
  const { register, handleSubmit, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const {bookings,setBookings} = useContext(UserContext);
  const [status,setStatus] = useState('idle');
  const [alert,setAlert] = useState(false);
  const classes = useStyles();
  useEffect(()=>{
    setStatus('pending')
    fetch('https://mysterious-mountain-99777.herokuapp.com/orders')
    .then(res => res.json())
    .then(data =>{
      setStatus('resolved')
      setBookings(data);
    })
  },[setBookings])

  if(status === 'pending'){
    return <div className="d-flex justify-content-center align-content-center mt-5"><CircularProgress animation="border" role="status">
    <span className="sr-only d-flex justify-content-center">Loading...</span>
  </CircularProgress>
  </div>
  }

  const onSubmit = data => {
    const bookData = {
      name: data.name,
      imageURL: imageURL,
      author: data.author,
      price : data.price
    };
    const url = `https://mysterious-mountain-99777.herokuapp.com/admin`;
    
    fetch(url, {
      method: 'POST', 
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(bookData)
    })
    .then(res => {
       setAlert(true);
    })
  };

  const handleImageUpload = event => {
    const imageData = new FormData();
    imageData.set('key', 'd91fa87beb272af2ab5055ea39823dce');
    imageData.append('image', event.target.files[0]);
    
    axios.post('https://api.imgbb.com/1/upload', 
    imageData)
    .then(function (response) {
      setImageURL(response.data.data.display_url);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
  <Row>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="first" 
          >Manage Orders</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second" 
          >Add Books</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="third" 
          >Edit Book</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9}>
  <Tab.Content>
  <Tab.Pane eventKey="first">
  <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Booked By</StyledTableCell>
            <StyledTableCell align="right">Booked Items</StyledTableCell>
            <StyledTableCell align="right">Author</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            bookings?.map(book =><ManageBooks key= {book._id} book={book}></ManageBooks>)
          }
        </TableBody>
      </Table>
    </TableContainer>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
          
        <form className="form my-2 mr-5" onSubmit={handleSubmit(onSubmit)}>
       <div className="mb-3 form-group">
       <input name="name" ref={register({ required: true })} type="text" placeholder="Name" className="form-control"/>
       {errors.name && <span className="error">Name is required</span>}
      </div>

       <div className="mb-2 form-group">
        <input name="author" ref={register({ required: true })} type="text" placeholder="Author" className="form-control"/>
        </div>

       <div className="mb-2 form-group">
        <input name="price" ref={register({ required: true })} type="number" placeholder="Price" className="form-control" required/>
        {errors.price && <span className="error">Price is required</span>}
        </div>

        <div className="mb-2 form-group">
        <input name="file" onChange={handleImageUpload} ref={register({ required: true })} type="file" placeholder="Choose File" className="form-control" required/>
        {errors.file && <span className="error">File is required</span>}
        </div>

        <div className="mb-2 d-grid form-group">
        <input type="submit" value="Submit" className="btn btn-primary"/>
         </div>
        </form>
        {alert && 
        <div className={classes.root}>
        <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        File Updated — <strong>check it out!</strong>
      </Alert>
        </div>
        }
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>
    </div>
  );
};

export default Admin;