// PlayerCard.js

import React, {useState} from 'react';
import CardFront from './CardFront';
import CardBack from './CardBack';

function PlayerCard(props) {
    const [isFlipped, setIsFlipped] = useState(false);

    function flipCard() {
        setIsFlipped(!isFlipped);
    }

    return (
        <div className="player-card" onClick={flipCard}>
            {isFlipped ? <CardFront player={props.player} /> : <CardBack />}
        </div>
    );
}

export default PlayerCard;
