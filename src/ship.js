export class Ship {

    constructor(length) {
        this.length = length;
        this.hitNum = 0;
        this.isSunk = false;
    }

    hit() {
        this.hitNum += 1;
    }

    isSunk() {
        if (this.hitNum === this.length) {
            this.isSunk = true;
        }
    }
}
