import React from 'react';

// GameTitle component
function GameTitle() {
    return (
        <div className="game-title">
            <h1>Werewolf Game</h1>
        </div>
    );
}

// GameStatus component
function GameStatus(props) {
    const { status } = props;
    return (
        <div className="game-status">
            <h2>{status}</h2>
        </div>
    );
}

// PlayerName component
function PlayerName(props) {
    const { playerName } = props;
    return (
        <div className="player-name">
            <p>{playerName}</p>
        </div>
    );
}

// Role component
function Role(props) {
    const { role } = props;
    return (
        <div className="role">
            <h2>Role: {role}</h2>
        </div>
    );
}

export { GameTitle, GameStatus, PlayerName, Role };
