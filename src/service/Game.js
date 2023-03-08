let table = null;
let currentTurn = null;

const SUCCESS_STATUS = 'ok';

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

export {
    startGame
}