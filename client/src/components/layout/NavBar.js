import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_SERVER } from '../Config';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function NavBar(props) {
    const userData = useSelector(state => state.user.userData);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    useEffect(()=>{
      if(userData) {

      let count = 0;
      userData.cart.map(item => count += Number(count) + Number(item.quantity))
      setCartCount(count)
      }
    },[userData])
    const handleLogout = () => {
      axios.get(`${USER_SERVER}/logout`).then(response => {
        if (response.status === 200) {
            navigate("/login");
        } else {
            alert('Log Out Failed')
        }
      });
    };
    if (userData && !userData.isAuth) {
    return (
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/signup">Register</NavLink></li>
        </ul>
    )} else {
    return (
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/products/add">Add Product</NavLink></li>
          <li><NavLink to="/cart">Cart {cartCount > 0 && <small>{cartCount}</small>}</NavLink></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
    )};
}

export default NavBar;