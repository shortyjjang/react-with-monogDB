import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../Config';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function NavBar(props) {
    const user = useSelector(state => state.user);
    const navigate = useNavigate()
    const handleLogout = () => {
      axios.get(`${USER_SERVER}/logout`).then(response => {
        if (response.status === 200) {
            navigate("/login");
        } else {
            alert('Log Out Failed')
        }
      });
    };
    if (user.userData && !user.userData.isAuth) {
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
          <li><NavLink to="/cart">Cart</NavLink></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
    )};
}

export default NavBar;