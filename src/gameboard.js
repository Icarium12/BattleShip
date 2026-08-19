import { Ship } from "./ship";


class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `${x}, ${y}`;
        this.hasShip = false
        this.value = null;
        this.role = null;
        this.allSpaces = null;
        this.anchorTo = null;
        this.hit = false;
        // this.neighbors = [];
        // this.up = null;
        // this.down = null;
        // this.left = null;
        // this.right = null;

    }
}


export class Gameboard {

    constructor() {
        this.board = [];
        this.ship1 = new Ship(3);
        this.ship2 = new Ship(2);
        this.ship3 = new Ship(1);
        this.ship4 = new Ship(1);
        this.ship5 = new Ship(2);
        this.ship6 = new Ship(3);
        this.ship7 = new Ship(4);
        this.ship8 = new Ship(2);
        this.ship9 = new Ship(1);
        this.ship10 = new Ship(1);
        this.ships = [this.ship1, this.ship2, this.ship3, this.ship4, this.ship5,
                    this.ship6, this.ship7, this.ship8, this.ship9, this.ship10
        ]
    }

    createBoard() {
        let rows = 10; 
        let cols = 10;

        for (let i = 0; i<rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < cols; j++) {
                this.board[i][j] = new Node(i, j);
            }
        }

    }

    placeShip(row, col, length, direction) {
        if (length <= 4) {
            const ship = new Ship(length);
            if (direction === "vertical") {
                // check valid placement
                if (row >= 0 && row + length <= 10 && col > 0 && col < 10) {
                    // check place down
                    if (row + length <= 10) {
                        for (let i = 0; i < length; i++) {
                            if (i === 0) {
                                if(this.board[row][col].hasShip === false) {
                                    this.board[row][col].role = "anchor";
                                    this.board[row][col].hasShip = true;
                                    this.board[row][col].value = ship;
                                    // this.board[row][x].allSpaces.push([row, x]);  
                                }
                                else {
                                    return "Invalid Placement";
                                }
                                
                            }
                            else {
                                if (this.board[row + 1][col].hasShip === false) {
                                    this.board[row + 1][col].role = "pointer";
                                    this.board[row + 1][col].hasShip = true;
                                    this.board[row + 1][col].value = ship;
                                    // this.board[row + 1][x].allSpaces.push([row + 1, x]);
                                    row = row +1;    
                                }
                                else {
                                    return "Invalid Placement";
                                }
                            }
                        }
                
                    }
                    else {
                        return "Not enough space";
                    }
                } 
                else {
                    return  "Invallid Placement";
                }
            }
            else if (direction === "horizontal") {
                // check valid placement 
                if (col >= 0 && col + length <= 10 && row >= 0 && row < 10) {
                    //check right 
                    if (col + length <= 10) {
                        for(let i = 0; i < length; i++) {
                            if (i === 0) {
                                if (this.board[row][col].hasShip === false) {
                                    this.board[row][col].role = "anchor";
                                    this.board[row][col].hasShip = true;
                                    this.board[row][col].value = ship;
                                    // this.board[row][x].allSpaces = [];
                                    // this.board[row][x].allSpaces.push([row, x]);
                                }
                                else {
                                    return "Invalid Placement";
                                }

                            }
                            else {
                                if (this.board[row][col+1].hasShip===false) {
                                    this.board[row][col+1].role = "pointer";
                                    this.board[row][col+1].hasShip = true;
                                    this.board[row][col+1].value = ship;
                                    // this.board[row][x+1].allSpaces.push([row, x+1]);
                                    col = col + 1;
                                }
                                else {
                                    return "Invalid Placement";
                                }
                            } 
                        }
                
                    }
                    else {
                        return "Not enough space";
                    }
                }

            }

        }
        else {
            return "Length is invalid lenght can onlrow be among 1-4";
        }


    }

    placeShipDefault() { 
        const ship1Coords = [
            {r: 0, c: 2},
            {r: 0, c: 3},
            {r: 0, c: 4}
        ];

        ship1Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship1;
                this.board[coord.r][coord.c].allSpaces = ship1Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship1Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship1;
            }
        });

        const ship2Coords = [
            {r: 1, c: 7},
            {r: 2, c: 7}
        ];

        ship2Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship2;
                this.board[coord.r][coord.c].allSpaces = ship2Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship2Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship2;
            }
        });

        const ship3Coords = [
            {r: 5, c: 7}
        ];

        ship3Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship3;
                this.board[coord.r][coord.c].allSpaces = ship3Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship3Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship3;
            }
        })

        const ship4Coords = [
            {r: 4, c: 9}
        ];

        ship4Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship4;
                this.board[coord.r][coord.c].allSpaces = ship4Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship4Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship4;
            }
        });

        const ship5Coords = [
            {r: 5, c:1},
            {r: 6, c:1},
        ];

        ship5Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship5;
                this.board[coord.r][coord.c].allSpaces = ship5Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship5Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship5;
            }
        });

        const ship6Coords = [
            {r: 9, c: 5},
            {r: 9, c: 6},
            {r: 9, c: 7}
        ];

        ship6Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship6;
                this.board[coord.r][coord.c].allSpaces = ship6Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship6Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship6;
            }
        });

        const ship7Coords = [
            {r: 7, c: 3},
            {r: 7, c: 4},
            {r: 7, c: 5},
            {r: 7, c: 6},
        ];

        ship7Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship7;
                this.board[coord.r][coord.c].allSpaces = ship7Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship7Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship7;
            }
        });

        const ship8Coords = [
            {r: 5, c: 1},
            {r: 6, c: 1}
        ];

        ship8Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship8;
                this.board[coord.r][coord.c].allSpaces = ship8Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship8Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship8;
            }
        });

        const ship9Coords = [
            {r: 8, c: 9}
        ]

        ship9Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship9;
                this.board[coord.r][coord.c].allSpaces = ship9Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship9Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship9;
            }
        });

        const ship10Coords = [
            {r: 2, c: 5}
        ];

        ship10Coords.forEach((coord, index) => {
            if (index === 0) {
                this.board[coord.r][coord.c].role = "anchor";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship10;
                this.board[coord.r][coord.c].allSpaces = ship10Coords;
            }
            else {
                this.board[coord.r][coord.c].anchorTo = ship10Coords[0];
                this.board[coord.r][coord.c].role = "pointer";
                this.board[coord.r][coord.c].hasShip = true;
                this.board[coord.r][coord.c].value = this.ship10;
            }
        });
    }

    receiveAttack(x, y) {
        const target = this.board[x][y];
        if (target.hit === true) {
            const message = "Loction has already been atacked";
            return message;
        }
        else if (target.hasShip === false) {
            target.hit = true;
        }
        else {
            target.value.hit();
            target.value.isSunk();
            target.hit = true;
        }
    }

    checkShipSunk() {
        let sunkCount = 0;
        this.ships.forEach(ship => {
            if (ship.sunk === true) {
                sunkCount += 1;
            }
        });
        if (sunkCount === 10) {
            return "All ships sunk; You have won";
        }
    }
    
}