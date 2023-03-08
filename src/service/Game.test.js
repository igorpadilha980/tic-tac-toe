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
})