import React from 'react';

export const LupusBoard = ({ G, ctx, moves, playerID }) => {
    const playerRole = G.roles[playerID];

    const handleNominate = (playerIndex) => {
        if (playerRole === 'seer') {
            moves.nominate(playerIndex);
        }
    };

    const handleVote = (playerIndex) => {
        moves.vote(playerIndex);
    };

    const createPlayer = (playerIndex) => {
        const playerName = G.players[playerIndex] ? G.players[playerIndex].name : `Player ${playerIndex + 1}`;
        const isAlive = playerIndex !== G.killed;
        const isCurrentPlayer = playerIndex === parseInt(playerID);
        let content;

        if (isCurrentPlayer) {
            content = `Role: ${playerRole}`;
        } else if (!isAlive) {
            content = '[DEAD]';
        } else {
            content = '[Hidden]';
        }

        return {
            id: playerIndex,
            name: playerName,
            content: content,
            disabled: !isAlive || isCurrentPlayer,
            onClick: isCurrentPlayer ? null : () => handleNominate(playerIndex),
        };
    };

    const players = Array.from({ length: ctx.numPlayers }, (_, i) => createPlayer(i));

    const createVote = (playerIndex) => {
        const playerName = G.players[playerIndex] ? G.players[playerIndex].name : `Player ${playerIndex + 1}`;
        const hasVoted = G.votes[playerIndex] !== undefined;

        return {
            id: playerIndex,
            name: playerName,
            content: hasVoted ? 'Voted' : '',
            disabled: playerIndex === parseInt(playerID) || hasVoted,
            onClick: () => handleVote(playerIndex),
        };
    };

    const votes = Array.from({ length: ctx.numPlayers }, (_, i) => createVote(i));

    return (
        <div>
            <h2>Lupus Game Board in Tabula</h2>
            <table>
                <thead>
                <tr>
                    {players.map((player) => (
                        <th key={player.id}>{player.name}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {players.map((player) => (
                        <td key={player.id}>
                            <button disabled={player.disabled} onClick={player.onClick}>
                                {player.content}
                            </button>
                        </td>
                    ))}
                </tr>
                <tr>
                    {votes.map((vote) => (
                        <td key={vote.id}>
                            <button disabled={vote.disabled} onClick={vote.onClick}>
                                {vote.content}
                            </button>
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
            {ctx.phase === 'night' && (
                <div>
                    <p>Select a player to:</p>
                    {playerRole === 'werewolf' && <p>Kill:</p>}
                    {playerRole === 'seer' && <p>See:</p>}
                </div>
            )}
            {ctx.phase === 'day' && (
                <p>Vote on who you think the werewolf is.</p>
            )}
        </div>
    );
};
