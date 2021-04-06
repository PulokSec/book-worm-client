import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {
    Link
} from "react-router-dom";
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const {loggedInUser, setLoggedInUser ,cart} = useContext(UserContext);
    return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Link className="navbar-brand" to="/">Book<span className="text-primary">Worm</span></Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
      <Nav>
      <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
        <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>

        <li className="nav-item"><Link className="nav-link" aria-current="page" to="/orders">Orders</Link></li>

         <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>

         <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>

        {loggedInUser.email &&
        <li className="nav-item"><Link className="nav-link" to="/">{loggedInUser.email}</Link>  </li>}

        <li className="nav-item">
         {loggedInUser.email ?
        <Link onClick={()=> setLoggedInUser({})} className="nav-link" to="/">Sign Out</Link>
        :
         <Link  className="nav-link" to="/signUp">Sign In</Link>
         }
         </li>
         <li>
         <Link className="nav-link active" aria-current="page" to="/review"><FontAwesomeIcon icon={faShoppingCart}  /><span class='badge badge-warning' id='lblCartCount'>{cart.length || ""}</span></Link></li>
      </ul>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    );
};

export default Header;