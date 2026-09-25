import { Gameboard } from "./gameboard";

export class Player {
  constructor(type, name) {
    this.type = type;
    this.name = name;
    this.playerBoard = new Gameboard();
  }
}
