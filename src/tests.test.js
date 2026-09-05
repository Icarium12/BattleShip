import { Ship } from "./ship";
import  { Gameboard } from "./gameboard";

test('test for hit method', () => {
    const instance = new Ship(3);
    instance.hit();
    expect(instance.hitNum).toBe(1);
})

test('test for isSunk method', () => {
    const instance = new Ship(0);
    instance.isSunk();
    expect(instance.sunk).toBe(true);
})

test('test for gameboard receiveAttack', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShipDefault();
    gameboard.receiveAttack(5, 7);
    expect(gameboard.board[5][7].hit).toBe(true);
})

test('test for gameboard checkShipSunk', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShipDefault();   
    gameboard.ships.forEach(ship => {
        ship.sunk = true;
    });
    expect(gameboard.checkShipSunk()).toBe("All ships sunk; You have won");

})

test('test for placeship on gameboard', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShip(gameboard.ship7, 0, 0, "horizontal");
    expect(gameboard.board[0][0].role).toBe('anchor');
})

test('test for removeship on gameboard', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShip(gameboard.ship7, 0, 0, "horizontal");
    gameboard.removeShip(gameboard.ship7);
    expect(gameboard.board[0][0].role).toBe(null); 
})

test('set ship boundary', () => {
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.placeShip(gameboard.ship7, 0, 0, "horizontal");
    expect(gameboard.board[0][0].value.boundary.length > 0).toBe(true);
})