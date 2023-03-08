import Board from "./components/Board"

import { useState } from 'react';

import { move, startGame, SUCCESS_STATUS } from './service/Game';
 
function App() {
  const [ tiles, setTiles ] = useState(() => {
    return startGame().gameState.table;
  });

  const onMove = (x, y) => {
    const response = move(x, y)

    console.log(response.gameState.winner);

    if(response.status != SUCCESS_STATUS)
      return;

    if(response.gameState.winner !== undefined) {
      setTiles(startGame().gameState.table);
      return;
    }

    setTiles(response.gameState.table);
  };

  return <Board tiles={tiles} onMove={onMove}/>
}

export default App
