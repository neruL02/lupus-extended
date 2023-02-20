// CardBack.js

import React from 'react';
import cardBackImage from '../images/back.png';


function CardBack() {
    return (
        <div className="card-back">
            <img src={cardBackImage} alt="Card Back" />
        </div>
    );
}

export default CardBack;
