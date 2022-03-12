import React, { useState } from 'react';

function SearchFilter(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        props.handleSearch(e.target.value);
    }
    return (
        <input type="text" onChange={handleSearch} value={searchTerm} />
    );
}

export default SearchFilter;