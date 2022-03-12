import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import ImageUpload from '../../utils/ImageUpload';
import axios from 'axios';
import {PRODUCT_SERVER} from '../../Config'
import {collectionsList} from './section/data'

function AddProduct(props) {
    const navigate = useNavigate();
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [values, setValue] = useState({
        image: [],
        title: '',
        description: '',
        price: '',
        collections: 1,
    })
    const onChange = (e) => {
        const {name, value} = e.target;
        setValue({
            ...values,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            ...values,
            writer: props.user.userData._id
        };
        if(!values.title || !values.image || !values.description || !values.price || !values.collections) return setFormErrorMessage('모든 항목을 입력해주십시오.')

        axios.post(`${PRODUCT_SERVER}`, newProduct)
        .then(res => {
            if(res.data.success) {
                alert('상품이 추가 되었습니다.');
                navigate('/')
            }else {
                alert('상품이 추가 되지 못했습니다.')
            }
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <ImageUpload updateImages={(files) => setValue({...values, image: [...files]})}/>
            </div>
            <div>
                <label>Title</label>
                <input type="text" name="title" onChange={onChange} value={values.title} />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" onChange={onChange} value={values.description}></textarea>
            </div>
            <div>
                <label>Price($)</label>
                <input type="text" name="price" onChange={onChange} value={values.price} />
            </div>
            <div>
                <label>collections</label>
                <select name="collections" onChange={onChange} value={values.collections}>
                    {collectionsList.map(it => <option key={it.key} value={it.key}>{it.name}</option>)}
                </select>
            </div>
            {formErrorMessage && ({formErrorMessage})}
            <button type="submit">Save</button>
        </form>
    );
}

export default AddProduct;