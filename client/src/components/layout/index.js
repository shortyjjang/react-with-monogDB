import React from 'react';
import NavBar from './NavBar';

function Layout(props) {
  return (
    <div id="container-wrapper">
      <div id="header">
        <NavBar />
      </div>
      <div id="content">
          {props.children}
      </div>
    </div>
  )
}
export default Layout;