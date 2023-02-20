import {INVALID_MOVE} from "boardgame.io/core";


export const WerewolfGame = {
    name: "werewolf",
    setup: (ctx) => ({
        players: ctx.playOrder.map((player) => ({
            name: player,
            role: null,
            eliminated: false,
            votes: 0,
        })),
        eliminatedPlayer: null,
    }),

    flow: {
        startingPhase: "night",
        phases: {
            night: {
                turn: {
                    order: {
                        first: (G, ctx) => {
                            return ctx.playOrder.find(
                                (player) => G.players[player].role === "werewolf"
                            );
                        },
                        next: (G, ctx) => {
                            const currentPlayerIndex = ctx.playOrder.indexOf(ctx.currentPlayer);
                            const nextPlayerIndex = (currentPlayerIndex + 1) % ctx.numPlayers;
                            const nextPlayerId = ctx.playOrder[nextPlayerIndex];
                            const nextPlayerRole = G.players[nextPlayerId].role;
                            if (nextPlayerRole === "seer" || nextPlayerRole === "doctor") {
                                return nextPlayerId;
                            }
                            return ctx.playOrder.find(
                                (player) => G.players[player].role === "werewolf"
                            );
                        },
                    },
                    moves: {
                        chooseElimination: (G, ctx, playerId) => {
                            if (G.eliminatedPlayer !== null) {
                                return INVALID_MOVE;
                            }
                            G.eliminatedPlayer = playerId;
                        },
                        chooseInvestigation: (G, ctx, playerId) => {
                            if (G.eliminatedPlayer !== null) {
                                return INVALID_MOVE;
                            }
                            const playerRole = G.players[playerId].role;
                            ctx.events.setActivePlayers({
                                value: {
                                    [playerId]: playerRole,
                                },
                                moveLimit: 1,
                            });
                        },
                        chooseSave: (G, ctx, playerId) => {
                            if (G.eliminatedPlayer !== null) {
                                return INVALID_MOVE;
                            }
                            G.players[playerId].saved = true;
                        },
                    },
                },
                next: "day",
            },
            day: {
                turn: {
                    order: {
                        first: (G, ctx) => {
                            return ctx.playOrder[0];
                        },
                        next: (G, ctx) => {
                            const currentPlayerIndex = ctx.playOrder.indexOf(ctx.currentPlayer);
                            const nextPlayerIndex = (currentPlayerIndex + 1) % ctx.numPlayers;
                            const nextPlayerId = ctx.playOrder[nextPlayerIndex];
                            const nextPlayerRole = G.players[nextPlayerId].role;
                            if (nextPlayerRole === "seer" || nextPlayerRole === "doctor") {
                                return nextPlayerId;
                            }
                            return ctx.playOrder[nextPlayerIndex];
                        },
                    },
                    moves: {
                        accuse: {
                            moves: {
                                vote: (G, ctx, accusedPlayerId) => {
                                    G.players[accusedPlayerId].votes += 1;
                                },
                            },
                            next: "trial",
                        },
                        skip: {
                            moves: {
                                skipVote: (G, ctx) => {},
                            },
                            next: "night",
                        },
                    },
                },
                next: (G, ctx) => {
                    const players = G.players.filter((player) => !player.eliminated);
                    const numWerewolves = players.filter((player) => player.role === "werewolf").length;
                    const numNonWerewolves = players.length - numWerewolves;
                    if (numWerewolves === 0) {
                        return "endGame";
                    }
                    if (numWerewolves >= numNonWerewolves) {
                        return "endGame";
                    }
                    return "night";
                },
            },
            trial: {
                turn: {
                    order: {
                        first: (G, ctx) => {
                            return ctx.playOrder.find(
                                (player) => G.players[player].votes === Math.max(...G.players.map((p) => p.votes))
                            );
                        },
                        next: (G, ctx) => {
                            const currentPlayerIndex = ctx.playOrder.indexOf(ctx.currentPlayer);
                            const nextPlayerIndex = (currentPlayerIndex + 1) % ctx.numPlayers;
                            const nextPlayerId = ctx.playOrder[nextPlayerIndex];
                            const nextPlayerRole = G.players[nextPlayerId].role;
                            if (nextPlayerRole === "seer" || nextPlayerRole === "doctor") {
                                return nextPlayerId;
                            }
                            return ctx.playOrder[nextPlayerIndex];
                        },
                    },
                    moves: {
                        vote: (G, ctx, accusedPlayerId) => {
                            G.players[accusedPlayerId].votes += 1;
                        },
                    },
                },
                next: (G, ctx) => {
                    const accusedPlayer = G.players[G.eliminatedPlayer];
                    if (accusedPlayer.votes > (ctx.numPlayers / 2)) {
                        accusedPlayer.eliminated = true;
                    }
                    G.eliminatedPlayer = null;
                    return "day";
                },
            },
            endGame: {
                onEnd: (G, ctx) => {
                    const werewolves = G.players.filter((player) => player.role === "werewolf" && !player.eliminated);
                    const villagers = G.players.filter((player) => player.role !== "werewolf" && !player.eliminated);
                    let message = "";
                    if (werewolves.length === 0) {
                        message = "Villagers Win!";
                    } else {
                        message = "Werewolves Win!";
                    }
                    ctx.events.endGame({ message });
                },
            },
        },
    },
};
