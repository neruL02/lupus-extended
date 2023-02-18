import {Client} from 'boardgame.io/react';
import {Lupus} from './Game';
import {LupusBoard} from "./Board";


const App =  Client({
  game: Lupus,
  numPlayers: 7,
  board: LupusBoard,
});

export default App;
