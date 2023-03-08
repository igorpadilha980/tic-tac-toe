let table = null;
let currentTurn = null;

const SUCCESS_STATUS = 'ok';
const ERROR_STATUS = 'error';

function resetTable() {
    table = [ new Array(3), new Array(3), new Array(3) ];
    table.forEach(line => line.fill(null));    
}

function resetGame() {
    resetTable();
    currentTurn = 'cross';
}

function gameState() {
    return {
        table,
        currentTurn,
        winner: gameWinner()
    }
}

function gameResponse(status, message) {
    if(status === undefined)
        throw new Error("invalid response status: " + status);

    return {
        gameState: gameState(),
        status,
        message
    }
}

function startGame() {
    resetGame();

    return gameResponse(SUCCESS_STATUS);
}

function switchTurn() {
    currentTurn = (currentTurn == 'cross')? 'circle' : 'cross';
}

function makeMove(x, y) {
    table[y][x] = currentTurn;
}

function isLegalMove(x, y) {
    return table[y][x] === null && gameWinner() === undefined;
}

function evalTable() {
    let v = [ 0, 0, 0 ];
    let h = [ 0, 0, 0 ];
    let d = [ 0, 0 ];

    const evalSquare = (x, y) => {
        if(table[y][x] == null)
            return 0;

        return table[y][x] == 'cross'? 1 : -1;
    }

    for(let y = 0; y < 3; y++)
        for(let x = 0; x < 3; x++) {
            h[x] += evalSquare(x, y);
            v[x] += evalSquare(y, x);
            
            if(x == y) {
                d[0] += evalSquare(x, y);
                d[1] += evalSquare(2 - x, y);
            }
        }

    let tableEvaluations = [...v, ...h, ...d].filter(evaluation => Math.abs(evaluation) == 3);

    if(tableEvaluations.length == 0)
        return 0;

    return tableEvaluations[0] / 3;
}

function gameWinner() {
    let evaluation = evalTable();

    if(evaluation == 0)
        return undefined;
    
    return evaluation > 0? 'cross' : 'circle';
}

function move(x, y) {
    if(!isLegalMove(x, y))
        return gameResponse(ERROR_STATUS, 'illegal move');

    makeMove(x, y);
    switchTurn();

    return gameResponse(SUCCESS_STATUS);
}

export {
    startGame,
    move,
    SUCCESS_STATUS,
    ERROR_STATUS
}