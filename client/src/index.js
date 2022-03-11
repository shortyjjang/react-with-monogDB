import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducers';
import reportWebVitals from './reportWebVitals';
import "./assets/css/layout.css"
import Home from './components/views/Home';
import Layout from './components/layout';
import Login from './components/views/sign/Login';
import Register from './components/views/sign/Register';
import Auth from './Auth';
import {composeWithDevTools} from 'redux-devtools-extension'
import AddProduct from './components/views/product/AddProduct';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
const AuthHome = Auth(Home, null);
const AuthLogin = Auth(Login, false);
const AuthRegister = Auth(Register, false);
const AuthAddProduct = Auth(AddProduct, false);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer, composeWithDevTools())}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthHome />}/>
          <Route path="/login" element={<AuthLogin />}/>
          <Route path="/signup" element={<AuthRegister />}/>
          <Route path="/products/add" element={<AuthAddProduct />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
