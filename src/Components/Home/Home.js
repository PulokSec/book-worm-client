import React, { useContext } from 'react';
import Books from '../Books/Books';
import { UserContext } from '../../App';
import SearchBar from "material-ui-search-bar";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    width:'100%',
    flexGrow: 1,
    marginTop: '50px',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(3),
  },
  search:{
    boxShadow : '0 3px 5px 2px gray',
  }
}));
const Home = () => {
  const classes = useStyles();
  const {books,cart,setCart} = useContext(UserContext)

  const handleCart = (book)=>{
    const newCart = [...cart,book];
    setCart(newCart)
  }
  
  return (
    <div className="container">
    <div className="container mt-5 w-50">
    <SearchBar className={classes.search}
    value="search"
    // onChange={(newValue) => this.setState({ value: newValue })}
    // onRequestSearch={() => doSomethingWith(this.state.value)}  
  />
    </div>
    <Grid container spacing={2} className={classes.root}>
    {
           books.map(book => <Books handleCart = {handleCart} key={book._id} book={book}></Books>)
            }
      </Grid>
      </div>
  );
};

export default Home;