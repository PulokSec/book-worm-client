import React, { createContext, lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
export const UserContext = createContext();
const Header = lazy(()=> import('./Components/Header/Header.js'))
const Home = lazy(()=> import('./Components/Home/Home.js'))
const SignUp = lazy(()=> import('./Components/SignUp/SignUp.js'))
const Admin = lazy(()=> import('./Components/Admin/Admin.js'))
const PrivateRoute = lazy(()=> import('./Components/PrivateRoute/PrivateRoute.js'))
const Profile = lazy(()=> import('./Components/Profile/Profile.js'))
const NotFound = lazy(()=> import('./Components/NotFound/NotFound.js'))
const Review = lazy(()=> import('./Components/Review/Review.js'))
const Orders = lazy(()=> import('./Components/Orders/Orders.js'))




function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [books,setBooks] = useState([]);
  const [cart,setCart] = useState([]);
  const [bookings,setBookings] = useState([]);

  useEffect(()=>{
    fetch('https://mysterious-mountain-99777.herokuapp.com/books')
    .then(res => res.json())
    .then(data =>{
      setBooks(data);
    })
  },[])
 
  return (
      <UserContext.Provider value = {{bookings,setBookings,loggedInUser, setLoggedInUser,books,setBooks,cart,setCart}}>
        <Router>
      <Suspense fallback={
        <div className="d-flex justify-content-center align-content-center mt-5">
          <CircularProgress animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </CircularProgress>
        </div>
      }>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/signUp">
          <SignUp/>
        </Route>
        <PrivateRoute path="/profile">
          <Profile/>
        </PrivateRoute>
        <PrivateRoute path="/admin">
          <Admin/>
        </PrivateRoute>
        <PrivateRoute path="/orders">
          <Orders/>
        </PrivateRoute>
        <PrivateRoute path="/review">
          <Review/>
        </PrivateRoute>
        <Route path="*"><NotFound/></Route>
      </Switch>
      </Suspense>
      </Router>
      </UserContext.Provider>
  );
}

export default App;
