import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux'
import {getCartItems, removeCartItem} from '../../../_actions/user_action'
import CartList from './section/CartList';

function Cart(props) {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [emptyCart, setEmptyCart] = useState(false)
    useEffect(() =>  {
        let cartItems = []
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                .then(res => cacurlate(res.payload))
            }
        }
    },[dispatch, props.user.userData])
    const cacurlate = (cartDetail) => {
        let total = 0;
        cartDetail.map(it => total += parseInt(it.price,10) * it.quantity)
        setTotalPrice(total);
        setEmptyCart(true)
    }
    const deleteCartItem = (itemId) =>{
        dispatch(removeCartItem(itemId))
        .then(res => {
            if(res.payload.productInfo.length <= 0) {
                setEmptyCart(false)
            }
        })
    }
    return (
        <>
            <h1>Cart</h1>
            {emptyCart ? <>
                <CartList products={props.user.cartDetail} deleteItem={deleteCartItem} />
                <div>Total Amount : ${totalPrice}</div>
            </>
            : 'Empty Cart'}
        </>
    );
}

export default Cart;