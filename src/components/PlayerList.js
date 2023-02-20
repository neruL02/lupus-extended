// PlayerList.js

import React from 'react';
import PlayerCard from './PlayerCard';

function PlayerList() {
    const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'];

    return (
        <div className="player-list">
            {players.map((player) => (
                <PlayerCard key={player} player={player} />
            ))}
        </div>
    );
}

export default PlayerList;
