// GameBoard.js

import React from 'react';
import PlayerList from './PlayerList';
import Action from './Action';

function GameBoard() {
    return (
        <div className="game-board">
            <PlayerList />
            <Action />
        </div>
    );
}

export default GameBoard;
