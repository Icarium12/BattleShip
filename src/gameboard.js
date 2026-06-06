import { Ship } from "./ship";


class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = `${x}, ${y}`;
        this.hasShip = false
        this.value = null;
        this.hit;
        this.neighbors = [];
        this.up = null;
        this.down = null;
        this.left = null;
        this.right = null;

    }

    addNeighbor(node) {
        if (!this.neighbors.includes(node)) {
            this.neighbors.push(node);
        }
    }
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

        for (let i = 0; i < cols; x++) {
            for (let j = 0; j < rows; j++) {
                const currentNode = this.board[i][j];

                if (i > 0) {
                    currentNode.addNeighbor(this.board[i - 1][j]);
                    currentNode.down = this.board[i - 1][j];
                }
                if (i < cols - 1) {
                    currentNode.addNeighbor(this.board[i+1][j]);
                    currentNode.up = this.board[i + 1][j];
                }
                if (j > 0) {
                    currentNode.addNeighbor(this.board[i][j-1]);
                    currentNode.left = this.board[i][j-1];
                }
                if (j < rows - 1) {
                    currentNode.addNeighbor(this.board[i][j+1]);
                    currentNode.right = this.board[i][j+1];
                }
            }
        }
    }

    placeShips() {
        this.board[9][5].value = this.ship1;
        this.board[9][5].hasShip = true;
        let currentNode = this.board[9][5].right;
        for(let i = 1; i < this.board[9][5].value.length; i++) {
            currentNode.value = this.ship1;
            currentNode.hasShip = true;
            currentNode = currentNode.right;
        }
    }

    
}