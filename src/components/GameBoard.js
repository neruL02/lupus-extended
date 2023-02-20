import React from 'react';
import { BoardProps } from 'boardgame.io/react';
import { Button } from 'react-bootstrap';

export const GameBoard = (props) => {
    const { G, ctx, moves, playerID } = props;

    const handleStartGame = () => {
        moves.startGame();
    };

    const handleEndNight = () => {
        moves.endNight();
    };

    const handleEndGame = () => {
        moves.endGame();
    };

    return (
        <div>
            {G.phase === 'lobby' && (
                <div>
                    <p>Waiting for players to join...</p>
                    {playerID === '0' && (
                        <Button variant="primary" onClick={handleStartGame}>
                            Start Game
                        </Button>
                    )}
                </div>
            )}
            {G.phase === 'night' && (
                <div>
                    <p>Night phase</p>
                    <Button variant="primary" onClick={handleEndNight}>
                        End Night
                    </Button>
                </div>
            )}
            {G.phase === 'day' && (
                <div>
                    <p>Day phase</p>
                    <Button variant="primary" onClick={handleEndGame}>
                        End Game
                    </Button>
                </div>
            )}
        </div>
    );
};
