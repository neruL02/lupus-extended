import React from 'react';
import { Client } from 'boardgame.io/react';
import { WerewolfGame } from './game';
import { GameBoard } from './components/GameBoard';

const WerewolfClient = Client({
    game: WerewolfGame,
    board: GameBoard,
});

function App() {
    return (
        <div>
            <WerewolfClient />
        </div>
    );
}

export default App;
