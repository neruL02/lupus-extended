import { INVALID_MOVE } from 'boardgame.io/core';

export const WerewolfGame = {
    setup: () => ({
        players: [],
        phase: 'lobby',
        werewolf: [],
        seer: '',
        victim: '',
        vote: [],
    }),

    moves: {
        startGame: (G, ctx) => {
            if (G.players.length < 3) {
                return INVALID_MOVE;
            }
            G.phase = 'night';
        },

        endNight: (G, ctx) => {
            G.phase = 'day';
        },

        endGame: (G, ctx) => {
            const werewolfWin = G.werewolf.length >= G.players.length / 2;
            return { werewolfWin };
        },
    },
};
