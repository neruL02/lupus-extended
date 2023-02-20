import React, { useState } from 'react';
import Header from './Header';
import GameBoard from './GameBoard';

function App() {
    // Initialize game state
    const [players, setPlayers] = useState([
        { name: 'Player 1', role: 'Villager', alive: true },
        { name: 'Player 2', role: 'Villager', alive: true },
        { name: 'Player 3', role: 'Werewolf', alive: true },
        { name: 'Player 4', role: 'Seer', alive: true },
        { name: 'Player 5', role: 'Doctor', alive: true },
    ]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [gamePhase, setGamePhase] = useState('night');
    const [gameStatus, setGameStatus] = useState('Werewolves, open your eyes...');

    // Handler for when a player performs an action
    function handleAction(role) {
        // Perform action based on player's role
        if (role === 'Werewolf') {
            // Werewolf action logic
        } else if (role === 'Seer') {
            // Seer action logic
        } else if (role === 'Doctor') {
            // Doctor action logic
        }

        // Update game state
        // ...
    }

    return (
        <div className="App">
            <Header title="Werewolf Game"
                playerName={players[currentPlayerIndex].name}
                playerRole={players[currentPlayerIndex].role}
                gameStatus={gameStatus}
            />
            <GameBoard
                players={players}
                currentPlayerIndex={currentPlayerIndex}
                gamePhase={gamePhase}
                onAction={handleAction}
            />

        </div>
    );
}

export default App;
