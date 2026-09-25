import { Ship } from "./ship";
import  { Gameboard } from "./gameboard";
import { getAvailableTargets, getNeighbors, chooseTarget, computerMove } from "./game/ai";

test('test for hit method', () => {
    const instance = new Ship(3, 1);
    instance.hit();
    expect(instance.hitNum).toBe(1);
});

test('test for isSunk method', () => {
    const instance = new Ship(0, 1);
    instance.isSunk();
    expect(instance.sunk).toBe(true);
});

test('test for gameboard receiveAttack', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShipDefault();
    gameboard.receiveAttack(5, 7);
    expect(gameboard.board[5][7].hit).toBe(true);
});

test('test for gameboard checkShipSunk', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShipDefault();   
    gameboard.ships.forEach(ship => {
        ship.sunk = true;
    });
    expect(gameboard.checkShipSunk()).toBe("All ships sunk; You have won");

});

test('test for placeship on gameboard', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShip(gameboard.ship7, 0, 0, "horizontal");
    expect(gameboard.board[0][0].role).toBe('anchor');
});

test('test for removeship on gameboard', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShip(gameboard.ship7, 0, 0, "horizontal");
    gameboard.removeShip(gameboard.ship7);
    expect(gameboard.board[0][0].role).toBe(null); 
});

test('set ship boundary', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShip(gameboard.ship7, 0, 0, "horizontal");
    expect(gameboard.board[0][0].value.boundary.length > 0).toBe(true);
});

test("getAvailableTargets returns all 100 coordinates on fresh board", () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();

    const targets = getAvailableTargets(gameboard, {});
    expect(targets.length).toBe(100);

    //Mark one cell as hit
    gameboard.board[0][0].hit = true;
    const remainingTargets = getAvailableTargets(gameboard, {});
    expect(remainingTargets.length).toBe(99);
});

test("getNeighbors respects grid boundaries", () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();

    const cornerNeighbors = getNeighbors(0, 0, gameboard);
    expect(cornerNeighbors).toEqual([
        [1, 0],
        [0, 1]
    ]);

    const centerNeighbors = getNeighbors(5, 5, gameboard);
    expect(centerNeighbors.length).toBe(4);
});

test("chooseTarget prioritizes compTargets queues when available", () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();

    const gameState = {
        compTargets: [[3, 4], [3, 6]]
    };

    const target = chooseTarget(gameboard, gameState);
    expect(target).toEqual([3, 4]);
    expect(gameState.compTargets).toEqual([[3, 6]]);
});

test("computerMove only executes when it is computer's turn and switches on miss", () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();

    const notMyTurnState = {activePlayer: 1, boardOwner: 2, compTargets: []};
    expect(computerMove(gameboard, notMyTurnState)).toBeNull();

    const computerTurnState = {activePlayer: 2, boardOwner: 1, compTargets: []};
    const result = computerMove(gameboard, computerTurnState);

    expect(result.hit).toBe(false);
    expect(computerTurnState.activePlayer).toBe(1);
    expect(computerTurnState.boardOwner).toBe(2);
});

