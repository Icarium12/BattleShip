import { Ship } from "./ship";

test('test for hitnum', () => {
    const instance = new Ship(3);
    instance.hit();
    expect(instance.hitNum).toBe(1);
})