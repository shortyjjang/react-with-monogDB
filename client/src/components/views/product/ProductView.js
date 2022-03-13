/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {PRODUCT_SERVER} from '../../Config'
import { useParams, useNavigate, Link } from 'react-router-dom';
import {collectionsList} from './section/data'
import {useDispatch} from 'react-redux'
import {addToCart} from '../../../_actions/user_action'
import Comment from './section/Comment';

function ProductView(props) {
	const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [commentList, setCommentList] = useState([])
    const [productInfo, setProducts] = useState({})
    useEffect(()=>{
        axios.get(`${PRODUCT_SERVER}/products_by_id?id=${productId}&type=single`)
        .then(res => {
            setProducts(res.data[0])
        })
        .catch((error) => navigate('/'));

        axios.post(`http://localhost:5000/api/comment/getComments`, {productId: productId})
        .then(res => setCommentList(res.data));
        
    },[setProducts])
    const addToCartHandler = () => {
        dispatch(addToCart(productId))
    }
    return (
        <>
            <h1>{productInfo.title}</h1>
            <div>
                {productInfo.image && productInfo.image.length > 0 && 
                productInfo.image.map(it => <img src={`http://localhost:5000/${it}`} alt="" key={it}/>)}
            </div>
            <dt></dt>
            {collectionsList.filter(it => it.key ===  productInfo.collections).map(it => <div key={it.key}>카테고리: {it.name}</div>)}
            <div>가격: {productInfo.price}</div>
            <div>판매수: {productInfo.sold}</div>
            <div>조회수: {productInfo.views}</div>
            <div>{productInfo.description}</div>
            <div><button onClick={addToCartHandler}>장바구니에 담기</button></div>
            <Comment productId={productId} commentList={commentList}/>
            <Link to="/">목록</Link>
        </>
    );
}

export default ProductView;