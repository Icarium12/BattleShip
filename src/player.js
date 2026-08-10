import  { Gameboard } from "./gameboard";

export class Player {
    constructor(type) {
        this.type = type;
        this.playerBoard = new Gameboard();
    }
}