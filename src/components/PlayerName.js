// PlayerName.js

import React from 'react';

function PlayerName(props) {
    return (
        <div className="player-name">
            {props.player}
        </div>
    );
}

export default PlayerName;
