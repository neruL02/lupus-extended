// Define initial game state
const initialGameState = (numPlayers) => ({
    players: Array(numPlayers).fill(null),
    currentPlayer: 0,
    werewolf: null,
    seer: null,
    doctor: null,
});

// Define the available roles for players
const roles = ['werewolf', 'seer', 'doctor', 'villager'];

// Define the moves that can be made during the game
const moves = {
    werewolfSelectVictim(G, ctx, playerIndex, targetIndex) {
        return G.players[playerIndex] === 'werewolf' ? { ...G, victimIndex: targetIndex } : G;
    },
    seerInspectRole(G, ctx, playerIndex, targetIndex) {
        return G.players[playerIndex] === 'seer' ? { ...G, seerInspectIndex: targetIndex } : G;
    },
    doctorProtectPlayer(G, ctx, playerIndex, targetIndex) {
        return G.players[playerIndex] === 'doctor' ? { ...G, protectedIndex: targetIndex } : G;
    },
    voteToLynch(G, ctx, playerIndex, targetIndex) {
        if (!G.votes[targetIndex]) {
            G.votes[targetIndex] = [];
        }
        G.votes[targetIndex].push(playerIndex);
        return G;
    }
};


const flow = {
    startingPhase: 'night',
    phases: {
        night: {
            moves: {
                werewolfSelectVictim: moves.werewolfSelectVictim,
                seerInspectRole: moves.seerInspectRole,
                doctorProtectPlayer: moves.doctorProtectPlayer
            },
            endPhaseIf: (G, ctx) => seerInspected(G, ctx) && doctorProtected(G) && werewolfVictimSelected(G),
            next: 'day'
        },
        day: {
            moves: {
                voteToLynch: moves.voteToLynch
            },
            endPhaseIf: (G, ctx) => {
                const votes = Object.values(G.votes);
                const voteCounts = votes.reduce((counts, vote) => {
                    if (vote !== null) {
                        counts[vote] = (counts[vote] || 0) + 1;
                    }
                    return counts;
                }, {});

                const maxVotes = Math.max(...Object.values(voteCounts));
                const hasTie = Object.values(voteCounts).filter(count => count === maxVotes).length > 1;
                const hasMajority = maxVotes >= Math.ceil(ctx.numPlayers / 2);

                return hasTie || hasMajority;
            },
            next: 'night'
        }
    }
};

function seerInspected(G, ctx) {
    return Object.keys(G.seerInspections).length === ctx.numPlayers - 1;
}

function doctorProtected(G) {
    return G.doctorProtection !== null;
}

function werewolfVictimSelected(G) {
    return G.werewolfVictim !== null;
}

const endIf = (G, ctx) => {
    const numWerewolves = G.players.filter((player) => player.role === 'werewolf').length;
    const numVillagers = G.players.length - numWerewolves;

    // If there are no werewolves left, the villagers win
    if (numWerewolves === 0) {
        return { winner: 'villagers' };
    }

    // If the number of werewolves is greater than or equal to the number of villagers, the werewolves win
    if (numWerewolves >= numVillagers) {
        return { winner: 'werewolves' };
    }
};
// Export the Werewolf game object
export const Werewolf = {
    name: 'werewolf',
    setup: (ctx) => {
        const roles = assignRoles(ctx.numPlayers);
        return {
            players: Array(ctx.numPlayers).fill(null).map((_, i) => ({ role: roles[i] })),
            currentPlayer: 0,
            werewolf: null,
            seer: null,
            doctor: null,
            seerInspections: {},
            werewolfVictim: null,
            doctorProtection: null,
            votes: {}
        }
    },
    moves: moves,
    flow: flow,
    endIf: endIf,
};

