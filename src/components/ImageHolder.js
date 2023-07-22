import React from 'react';
import babyplaying from '../assets/babyplaying.jpg';
import lego from '../assets/lego.jpg';
import supermario from '../assets/supermario.jpg'
import train from '../assets/train.jpg'

const ImageHolder = () => {
    return (
    <div className="rightsection">
        <div>
            <img src={babyplaying} alt="Baby Playing" />
            <img src={lego} alt="Lego" />
            <img src={supermario} alt="Super Mario" />
            <img src={train} alt="Train" />
        </div>
    </div>
);
};

export default ImageHolder;
