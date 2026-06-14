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

    // addNeighbor(node) {
    //     if (!this.neighbors.includes(node)) {
    //         this.neighbors.push(node);
    //     }
    // }
}


class Gameboard {

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

        // for (let i = 0; i < cols; x++) {
        //     for (let j = 0; j < rows; j++) {
        //         const currentNode = this.board[i][j];

        //         if (i > 0) {
        //             currentNode.addNeighbor(this.board[i - 1][j]);
        //             currentNode.down = this.board[i - 1][j];
        //         }
        //         if (i < cols - 1) {
        //             currentNode.addNeighbor(this.board[i+1][j]);
        //             currentNode.up = this.board[i + 1][j];
        //         }
        //         if (j > 0) {
        //             currentNode.addNeighbor(this.board[i][j-1]);
        //             currentNode.left = this.board[i][j-1];
        //         }
        //         if (j < rows - 1) {
        //             currentNode.addNeighbor(this.board[i][j+1]);
        //             currentNode.right = this.board[i][j+1];
        //         }
        //     }
        // }
    }

    

    placeShip() { 
        const ship1Coords = [
            {r: 0, c: 2},
            {r: 0, c: 3},
            {r: 0, c: 3}
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

    
}