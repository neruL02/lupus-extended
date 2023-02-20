import { Client } from 'boardgame.io/react';
import { Werewolf } from './components/Game';
import { Board } from './Board';
import {Local} from "boardgame.io/multiplayer";

const WerewolfClient = Client({
    game: Werewolf,
    numPlayers: 5,
    board: Board,
    multiplayer: Local(),
    debug: true,
});

const App = () => (
    <div>
        {/*for each player, create a new client*/}

    </div>
);

export default App;
