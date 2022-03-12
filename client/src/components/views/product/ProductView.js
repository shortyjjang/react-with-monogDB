import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {PRODUCT_SERVER} from '../../Config'
import { useParams, useNavigate, Link } from 'react-router-dom';
import {collectionsList} from './section/data'

function ProductView(props) {
	const { productId } = useParams();
    const navigate = useNavigate();
    const [productInfo, setProducts] = useState({})
    useEffect(()=>{
        axios.get(`${PRODUCT_SERVER}/products_by_id?id=${productId}&type=single`)
        .then(res => {
            if(res.data.success) {
                setProducts(res.data.product[0])
                console.log(res.data.product[0].image.length)
            }else  {
                navigate('/')
            }
        })
    },[])
    return (
        <>
            <dl>
                <dd>
                    {productInfo.image && productInfo.image.length > 0 && productInfo.image.map(it => <img src={`http://localhost:5000/${it}`} alt="" key={it}/>)}
                </dd>
                <dt>{productInfo.title}</dt>
                {collectionsList.filter(it => it.key ===  productInfo.collections).map(it => <dd key={it.key}>카테고리: {it.name}</dd>)}
                <dd>가격: {productInfo.price}</dd>
                <dd>판매수: {productInfo.sold}</dd>
                <dd>조회수: {productInfo.views}</dd>
                <dd>{productInfo.description}</dd>
                <dd><button>장바구니에 담기</button></dd>
            </dl>
            <Link to="/">목록</Link>
        </>
    );
}

export default ProductView;