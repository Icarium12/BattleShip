import { Ship } from "./ship";


class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `${x}, ${y}`;
        this.hasShip = false
        this.value = null;
        this.role = null;
        this.allSpaces = [];
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
            const row = [];
            for (let j = 0; j < cols; j++) {
            row.push(new Node(i, j));
            }
            this.board.push(row);
        }

    }

    placeShip(ship, x, y, direction) {
        if(this.board[x][y].hasShip === true) {
            return "Invalid position";
        }
        else {
            const lenght =  ship.length;
            if (direction === 'vertical') {
                // check valid vertical placement
                if (x >= 0 && x + lenght <= 10 && y >= 0 && y < 10) {
                    const changeSpots = [];

                    for (let i = 0; i < lenght; i++) {
                        if (i === 0) {
                            this.board[x][y].role = "anchor";
                            this.board[x][y].hasShip = true;
                            this.board[x][y].value = ship;
                            changeSpots.push([x, y]);
                        }
                        else {
                            if(this.board[x + 1][y].hasShip === false) {
                                this.board[x + 1][y].role = "pointer";
                                this.board[x + 1][y].hasShip = true;
                                this.board[x + 1][y].value = ship;
                                changeSpots.push([x+1, y]);
                                x += 1;
                            }
                            else {
                                changeSpots.forEach(spot => {
                                    this.board[spot[0]][spot[1]].hasShip = false;
                                    this.board[spot[0]][spot[1]].role = null;
                                    this.board[spot[0]][spot[1]].value = null;
                                });
                                return "Invalid position";
                            }
                        }
                    }

                    changeSpots.forEach(spot => {
                        ship.coords.push(spot);
                    })
                } 
                else {
                    return "Invalid position";
                }
            }
            else if (direction === "horizontal") {
                // check horizontal postion
                if (y >= 0 && y + lenght <= 10 && x >= 0 && x < 10) {
                    const changeSpots = [];

                    for(let i = 0; i < lenght; i++) {
                        if (i === 0) {
                            this.board[x][y].role = "anchor";
                            this.board[x][y].hasShip = true;
                            this.board[x][y].value = ship;
                            changeSpots.push([x, y]);
                        }
                        else {
                            if (this.board[x][y+1].hasShip === false) {
                                this.board[x][y+1].role = "pointer";
                                this.board[x][y+1].hasShip = true;
                                this.board[x][y+1].value = ship;
                                changeSpots.push([x, y+1]);
                                y +=1;
                            }
                            else {
                                changeSpots.forEach(spot => {
                                    this.board[spot[0]][spot[1]].hasShip = false;
                                    this.board[spot[0]][spot[1]].role = null;
                                    this.board[spot[0]][spot[1]].value = null;
                                });
                                return "Invalid position";
                            }
                        }
                    }

                    changeSpots.forEach(spot => {
                        ship.coords.push(spot);
                    })
                } 
                else {
                    return "Invalid position";
                }
            }
        }


    }

    removeShip(ship) {
        if (ship.coords.length > 0) {
            ship.coords.forEach(coord => {
                this.board[coord[0]][coord[1]].hasShip = false;
                this.board[coord[0]][coord[1]].role = null;
                this.board[coord[0]][coord[1]].value = null;
            });

            ship.coords = [];
        }
        
    }

    randomPlacement(ship) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);

        const dirNum = Math.floor(Math.random() * 2);
        let direction;
        if (dirNum === 0) {
            direction = "vertical";
        }
        else {
            direction = "horizontal";
        }

        const validPlacement = this.placeShip(ship, x, y, direction);
        if (validPlacement === "Invalid position") {
            return this.randomPlacement(ship);
        }
        else {
            return;
        }
    }

    placeShipRandom() {

        this.ships.forEach(ship => {
            this.removeShip(ship);
            this.randomPlacement(ship);
        })
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
            {r: 2, c: 3},
            {r: 3, c: 3}
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
        } else {
            return null;
        }
    }
    
}