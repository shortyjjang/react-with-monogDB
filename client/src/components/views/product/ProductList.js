/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {PRODUCT_SERVER} from '../../Config'
import {collectionsList, prices} from './section/data'
import Filter from './section/Filter';
import SearchFilter from './section/SearchFilter';

function ProductList(props) {

    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [postSize, setPostSize] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVal, setFilterVal] = useState({
        collections: [],
        price: []
    })
    const limit = 10;

    useEffect(()=>{
        let body = {
            skip: 0,
            limit: limit
        }
        getProducts(body);
    },[])

    const getProducts = (body) =>{
        axios
            .post(`${PRODUCT_SERVER}/products`, body)
            .then(res => {
                if(res.data.success) {
                    if(body.loadMore) {
                        setProducts([...products, ...res.data.productInfo]);
                    }else{
                        setProducts(res.data.productInfo);
                    }
                    setPostSize(res.data.postSize)
                }else {
                    alert('상품을 가져오는데 실패했습니다.')
                }
            })
    }
    const moreProducts = () => {
        let newSkip = skip+limit
        let body = {
            skip: newSkip,
            limit: limit,
            loadMore: true
        }
        getProducts(body);
        setSkip(newSkip)
    }

    const handleFilter = (filters) =>{
        setFilterVal(filters);
        let body = {
            skip: 0,
            limit: limit,
            filters: filters,
            searchTerm: searchTerm,
        }
        getProducts(body);
        setSkip(0);
    }
    const handleSearch = (keyword) =>{
        setSearchTerm(keyword);
        let body = {
            skip: 0,
            limit: limit,
            filters: filterVal,
            searchTerm: keyword,
        }
        getProducts(body);
        setSkip(0);
    }
    return (
        <>
            <Filter price={prices} collection={collectionsList} handleFilter={filters => handleFilter(filters)} />
            <SearchFilter handleSearch={keyword => handleSearch(keyword)} />
            {products.map((it, index) => (
                <div key={index}><Link to={`/products/${it._id}`}>
                    <img src={`http://localhost:5000/${it.image}`} alt="" />
                    <b>{it.title}</b>
                    {it.price}
                </Link></div>
            ))}
            {postSize >= skip && (<button onClick={moreProducts}>더보기</button>)}
        </>
    );
}

export default ProductList;