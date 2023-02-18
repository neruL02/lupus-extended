const {INVALID_MOVE} = require('boardgame.io/core');

// Define the possible roles in Lupus
export const ROLES = Object.freeze({
    VILLAGER: 0,
    WEREWOLF: 1,
    SEER: 2,
    MEDIC: 3,
});


// Define the game state
export const Lupus = {
    name: 'lupus',

    setup: (ctx) => ({
        // Set up the initial state of the game here
        players: Array(ctx.numPlayers).fill(null),
        roles: [],
        votes: {},
        killed: null,
        winner: null,
    }),

    moves: {
        // Define the available moves for the game here
        vote: (G, ctx, player) => {
            if (G.votes[player] !== undefined) {
                return INVALID_MOVE;
            }
            G.votes[player] = true;
            return G;
        },
        nominate: (G, ctx, player) => {
            if (G.roles[player] !== ROLES.SEER) {
                return INVALID_MOVE;
            }
            G.killed = player;
            return G;
        },
    },


    flow: {
        // Define the flow of the game here
        startingPhase: 'night',

        phases: {
            night: {
                turn: {
                    order: ['werewolf', 'seer', 'medic'],
                    activePlayers: {
                        all: 'choose',
                        moveLimit: 1,
                        simultaneous: true,
                    },
                },
                next: 'day',
            },
            day: {
                turn: {
                    order: {
                        first: (G) => G.killed || Object.keys(G.votes)[0],
                        next: (G, ctx) => {
                            const idx = Object.keys(G.votes).indexOf(ctx.currentPlayer);
                            if (idx === -1 || idx === Object.keys(G.votes).length - 1) {
                                return Object.keys(G.votes)[0];
                            }
                            return Object.keys(G.votes)[idx + 1];
                        },
                    },
                },
                onPhaseBegin: (G, ctx) => {
                    // Reset votes
                    G.votes = {};
                    // Check if game over
                    if (G.roles.filter((r) => r === ROLES.WEREWOLF).length === 0) {
                        G.winner = 'villagers';
                        ctx.events.endPhase();
                    } else if (
                        G.roles.filter((r) => r !== ROLES.WEREWOLF).length === 0 ||
                        G.roles[G.killed] === ROLES.WEREWOLF
                    ) {
                        G.winner = 'werewolves';
                        ctx.events.endPhase();
                    }
                },
                next: 'night',
            },
        },
    },
};
