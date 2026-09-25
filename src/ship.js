export class Ship {
  constructor(length, id) {
    this.length = length;
    this.hitNum = 0;
    this.sunk = false;
    this.coords = [];
    this.boundary = [];
    this.id = id;
  }

  hit() {
    this.hitNum += 1;
  }

  isSunk() {
    if (this.hitNum === this.length) {
      this.sunk = true;
    }
  }
}
