import React, { useState } from 'react';
import {Collapse} from 'react-collapse'

function Filter(props) {
    const [isCollapseOpenCollection, setCollapseOpenCollection] = useState(false);
    const [isCollapseOpenPrice, setCollapseOpenPrice] = useState(false);
    const [priceVal, setPriceVal] = useState(0)
    const [filterVal, setFilterVal] = useState({
        collections: [],
        price: []
    })
    const collectionHandler = (value) => {
        const currentIndex = filterVal.collections.indexOf(value)
        let newCollection = [...filterVal.collections]
        if(currentIndex < 0) {
            newCollection.push(value)
        }else{
            newCollection.splice(currentIndex,1)
        }
        setFilterVal({
            ...filterVal,
            collections: newCollection
        });
        props.handleFilter({
            ...filterVal,
            collections: newCollection
        })
    }
    const priceHandler = (value) => {
        setPriceVal(value)
        let newPrice = [];
        for(let key in props.price) {
            if(props.price[key].id === value) newPrice = props.price[key].range
        }
        props.handleFilter({
            ...filterVal,
            price: newPrice
        })
    }
    return (
        <>
            <div className="sort-collection">
                <button onClick={() => setCollapseOpenCollection(!isCollapseOpenCollection)}>Collections</button>
                <Collapse isOpened={isCollapseOpenCollection}>
                    {props.collection.map(it => (<label key={it.name}>
                        <input type="checkbox" value={it.key} onChange={() => collectionHandler(it.key)}
                        checked={filterVal.collections.indexOf(it.key) < 0 ? false : true} /> {it.name}
                    </label>))}
                </Collapse>
            </div>
            <div className="sort-price">
                <button onClick={() => setCollapseOpenPrice(!isCollapseOpenPrice)}>Price</button>
                <Collapse isOpened={isCollapseOpenPrice}>
                    {props.price.map((it) => (<label key={it.id}>
                        <input type="radio" value={it.id} onChange={() => priceHandler(it.id)}
                        checked={priceVal === it.id ? true : false} name="price" /> {it.name}
                    </label>))}
                </Collapse>
            </div>
        </>
    );
}

export default Filter;