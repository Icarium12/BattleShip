import { Ship } from "./ship";

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