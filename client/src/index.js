import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import "./assets/css/layout.css"
import Home from './pages/Home';
import Layouts from  './components/Layouts';

ReactDOM.render(
  <BrowserRouter>
    <Layouts>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Layouts>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
