import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM
} from './types';
import { USER_SERVER, PRODUCT_SERVER } from '../components/Config.js';

export function loginUser(dataSubmit) {
    
    const request = axios.post(`${USER_SERVER}/login`, dataSubmit)
    .then(res => res.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}
export function registerUser(dataSubmit) {
    
    const request = axios.post(`${USER_SERVER}/register`, dataSubmit)
    .then(res => res.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}
export function auth() {
    
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(res => res.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}
export function addToCart(id) {
    let body = {
        productId: id
    }
    
    const request = axios.post(`${USER_SERVER}/addToCart`, body)
    .then(res => res.data)

    return {
        type: ADD_TO_CART,
        payload: request
    }
}
export function getCartItems(cartItems, userCart) {
    
    const request = axios.get(`${PRODUCT_SERVER}/products_by_id?id=${cartItems}&type=array`)
        .then(res => {
            userCart.forEach(cartItem => {
                res.data.forEach((productDetail,i) => {
                    if(cartItem.id === productDetail._id) {
                        res.data[i].quantity = cartItem.quantity
                    }
                })
            });
            return res.data
        })

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}
export function removeCartItem(productId){
    
    const request = axios.get(`${USER_SERVER}/removeFromCart?id=${productId}`)
        .then(res => {
            //CartDetail만들기
            res.data.cart.forEach((cartItem) => {
                res.data.productInfo.forEach((productDetail,i) => {
                    if(cartItem.id === productDetail._id) {
                        res.data.productInfo[i].quantity = cartItem.quantity
                    }
                })
            })
            return res.data
        })
    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}