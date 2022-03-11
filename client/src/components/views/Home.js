import React, { useEffect } from 'react';
import axios from 'axios';
import {PRODUCT_SERVER} from '../Config'


function Home(props) {

    useEffect(()=>{
        axios.post(`${PRODUCT_SERVER}/products`)
        .then(res => {
            if(res.data.success) {
                console.log(res.data);
            }else {
                alert('상품을 가져오는데 실패했습니다.')
            }
        })
    },[])

    return (
        <>
        </>
    );
}

export default Home;