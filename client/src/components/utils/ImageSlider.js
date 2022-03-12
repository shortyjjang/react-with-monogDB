import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function ImageSlider(props) {
    return (
        <Carousel infiniteLoop autoPlay>
            {props.images.map((it, index) => <img src={`http://localhost:5000/${it}`} alt="" key={index} />)}
        </Carousel>
    );
}

export default ImageSlider;