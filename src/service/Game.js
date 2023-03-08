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
        currentTurn
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
    return table[y][x] === null;
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