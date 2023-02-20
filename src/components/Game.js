const Werewolf = {
    setup: (ctx) => {
        const playerRoles = assignRoles(ctx.numPlayers);
        return {
            players: Array(ctx.numPlayers).fill(null),
            playerRoles,
            revealedRoles: Array(ctx.numPlayers).fill(false),
            votes: Array(ctx.numPlayers).fill(0),
            phase: "day",
            currentTurn: 0,
        };
    },

    moves: {
        vote: (G, ctx, voteTarget) => {
            const playerID = ctx.currentPlayer;
            G.votes[voteTarget]++;
            G.players[playerID].voted = true;
            ctx.events.endTurn();
        },
        revealRole: (G, ctx, playerID) => {
            G.revealedRoles[playerID] = true;
            ctx.events.endTurn();
        },
    },

    flow: {
        startingPhase: "day",

        phases: {
            day: {
                turn: {
                    order: {
                        first: (G, ctx) => ctx.currentPlayer,
                        next: (G, ctx) => (ctx.currentPlayer + 1) % ctx.numPlayers,
                    },
                },
                movesPerTurn: 1,
                onTurnBegin: (G, ctx) => {
                    G.currentTurn++;
                    G.players[ctx.currentPlayer].voted = false;
                    if (G.currentTurn > 1) {
                        checkIfGameOver(G, ctx);
                    }
                },
                endTurnIf: (G, ctx) => {
                    if (G.players.every((player) => player.voted)) {
                        return { next: "night" };
                    }
                },
            },

            night: {
                turn: {
                    order: {
                        first: (G, ctx) => ctx.currentPlayer,
                        next: (G, ctx) => (ctx.currentPlayer + 1) % ctx.numPlayers,
                    },
                },
                movesPerTurn: 1,
                onTurnBegin: (G, ctx) => {
                    G.players[ctx.currentPlayer].voted = false;
                },
                endTurnIf: (G, ctx) => {
                    if (G.players.every((player) => player.voted)) {
                        return { next: "day" };
                    }
                },
            },
        },
    },

    endIf: (G, ctx) => {
        if (G.phase === "gameover") {
            return { winner: checkWinCondition(G) };
        }
    },
};


export default Werewolf;
