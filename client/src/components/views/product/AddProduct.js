import React, { useState } from 'react';

function AddProduct(props) {
    const [values, setValue] = useState({
        email: '',
        password: ''
    })
    const onChange = (e) => {
        const {name, value} = e.target;
        setValue({
            ...values,
            [name]: value
        })
    }
    return (
        <form>
            <div>
                <label>Title</label>
                <input type="text" name="title" />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description"></textarea>
            </div>
            <div>
                <label>Price($)</label>
                <input type="text" name="price" />
            </div>
            <div>
                <label>Collection</label>
                <select name="collection">
                    <option></option>
                </select>
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export default AddProduct;