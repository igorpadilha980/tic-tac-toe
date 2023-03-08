import { test, expect, describe } from "vitest";
import { startGame } from "./Game";

describe("Game service", () => {
    test('start game must return clean game state', () => {
        const nullArray = () => new Array(3).fill(null);

        const table = [ nullArray(), nullArray(), nullArray() ];

        const expectedResponse = {
            gameState: {
                table,
                currentTurn: 'cross'
            },
            status: 'ok'
        };

        expect(startGame()).toEqual(expectedResponse);
    })
})