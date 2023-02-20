// CardFront.js

import React from 'react';
import PlayerName from './PlayerName';
import Role from './Role';
import Action from './Action';

function CardFront(props) {
    return (
        <div className="card-front">
            <PlayerName player={props.player} />
            <Role />
            <Action />
        </div>
    );
}

export default CardFront;
