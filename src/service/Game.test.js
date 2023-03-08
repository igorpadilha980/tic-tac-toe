import { test, expect, describe, beforeEach } from "vitest";
import { move, startGame, SUCCESS_STATUS, ERROR_STATUS } from "./Game";

const nullArray = () => new Array(3).fill(null);
const cleanTable = () => {
    return [ nullArray(), nullArray(), nullArray() ];
}

describe("Game service", () => {
    beforeEach(() => {
        startGame();
    });

    test('start game must return clean game state', () => {
        const table = cleanTable();

        const expectedResponse = {
            gameState: {
                table,
                currentTurn: 'cross'
            },
            status: SUCCESS_STATUS
        };

        expect(startGame()).toEqual(expectedResponse);
    })

    test('should register players moves', () => {
        const expectedTable = cleanTable();
        const checkIfMakesMove = (x, y) => {
            const moveResponse = move(x, y);

            expect(moveResponse.status).toBe(SUCCESS_STATUS);
            expect(moveResponse.gameState.table).toEqual(expectedTable);
        }

        expectedTable[0][0] = 'cross';
        checkIfMakesMove(0, 0);
        
        expectedTable[1][0] = 'circle';
        checkIfMakesMove(0, 1);
    }) 

    test('should not make illegal move', () => {
        move(0, 0);
        expect(move(0, 0).status).toBe(ERROR_STATUS);
    })

    test('should detect when game is finished, returning winner', () => {
        move(0, 0);
        move(0, 1);
        move(1, 0);
        move(1, 1);

        const response = move(2, 0);
        
        expect(response.status).toBe(SUCCESS_STATUS);
        expect(response.gameState.winner).toBe('cross');
        expect(response.gameState.currentTurn).toBe(null);
    })

    test('should fail to attempt any make move after game is finished', () => {
        move(0, 0);
        move(0, 1);
        move(1, 1);
        move(2, 1);
        move(2, 2);

        expect(move(0, 2).status).toBe(ERROR_STATUS);
    })

    test('should failt to make a move out of table bounds', () => {
        expect(move(3, 3).status).toBe(ERROR_STATUS);
        expect(move(-3, -3).status).toBe(ERROR_STATUS);
        expect(move(3, -3).status).toBe(ERROR_STATUS);
    })

    test('should stop the game in case of tie', () => {
        
        move(1, 1);
        move(0, 0);
        
        move(0, 2);
        move(2, 0);

        move(1, 0);
        move(1, 2);

        move(0, 1);
        move(2, 1);

        let response = move(2, 2);

        expect(response.gameState.currentTurn).toBe(null);
        expect(response.gameState.winner).toBe(null);
    })
})