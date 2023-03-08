import Piece from "../Piece";
import Square from "../Square";

import './board.css';

function Board({ tiles }) {
    const squares = [];

    for(let y = 0; y < 3; y++)
        for(let x = 0; x < 3; x++) {
            let tile = tiles[y][x];
            squares.push(<Square>{tile? <Piece type={tile} /> : null}</Square>)
        }

    return <div className="board">{ squares }</div>
}

export default Board;