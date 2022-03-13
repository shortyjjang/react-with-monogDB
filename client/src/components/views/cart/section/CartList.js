import React from 'react';

function CartList(props) {
    return (
        <div>
            {props.products && props.products.map((product,i) => (
                <li key={i}>
                    <h2>{product.title}</h2>
                    <div><img src={`http://localhost:5000/${product.image[0]}`} alt="" /></div>
                    <div>{product.quantity} EA</div>
                    <div>{product.price}</div>
                    <button onClick={() => props.deleteItem(product._id)}>Remove</button>
                </li>
            ))}
        </div>
    );
}

export default CartList;