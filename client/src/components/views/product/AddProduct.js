import React, { useState } from 'react';
import ImageUpload from '../../utils/ImageUpload';

function AddProduct(props) {
    const collections = [
        {key: 1, name: "Men"},
        {key: 2, name: "Women"},
        {key: 3, name: "Shoes"},
        {key: 4, name: "Bag"},
    ]
    const [values, setValue] = useState({
        image: [],
        title: '',
        description: '',
        price: '',
        collection: 1,
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
        const newProduct = values;
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <ImageUpload />
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
                <label>Collection</label>
                <select name="collection" onChange={onChange} value={values.collection}>
                    {collections.map(it => <option key={it.key} value={it.key}>{it.name}</option>)}
                </select>
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default AddProduct;