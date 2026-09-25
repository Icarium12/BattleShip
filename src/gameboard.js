import { Ship } from "./ship";

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = `${x}, ${y}`;
    this.hasShip = false;
    this.value = null;
    this.role = null;
    this.allSpaces = [];
    this.anchorTo = null;
    this.hit = false;
  }
}

export class Gameboard {
  constructor() {
    this.board = [];
    this.ship1 = new Ship(3, 1);
    this.ship2 = new Ship(2, 2);
    this.ship3 = new Ship(1, 3);
    this.ship4 = new Ship(1, 4);
    this.ship5 = new Ship(2, 5);
    this.ship6 = new Ship(3, 6);
    this.ship7 = new Ship(4, 7);
    this.ship8 = new Ship(2, 8);
    this.ship9 = new Ship(1, 9);
    this.ship10 = new Ship(1, 10);
    this.ships = [
      this.ship1,
      this.ship2,
      this.ship3,
      this.ship4,
      this.ship5,
      this.ship6,
      this.ship7,
      this.ship8,
      this.ship9,
      this.ship10,
    ];
  }

  createBoard() {
    let rows = 10;
    let cols = 10;

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(new Node(i, j));
      }
      this.board.push(row);
    }
  }

  checkPlacement(ship, startX, startY, direction) {
    const positions = [];
    const length = ship.length;

    for (let i = 0; i < length; i++) {
      const x = direction === "vertical" ? startX + i : startX;
      const y = direction === "horizontal" ? startY + i : startY;

      if (x < 0 || x >= 10 || y < 0 || y >= 10) {
        return false;
      }

      positions.push([x, y]);
    }

    for (const [x, y] of positions) {
      for (let neighborX = x - 1; neighborX <= x + 1; neighborX++) {
        for (let neighborY = y - 1; neighborY <= y + 1; neighborY++) {
          if (
            neighborX >= 0 &&
            neighborX < 10 &&
            neighborY >= 0 &&
            neighborY < 10 &&
            this.board[neighborX][neighborY].hasShip
          ) {
            return false;
          } else {
          }
        }
      }
    }

    return true;
  }

  setShipBoundary(ship) {
    ship.coords.forEach(([x, y]) => {
      for (let boundaryX = x - 1; boundaryX <= x + 1; boundaryX++) {
        for (let boundaryY = y - 1; boundaryY <= y + 1; boundaryY++) {
          if (
            boundaryX >= 0 &&
            boundaryX < 10 &&
            boundaryY >= 0 &&
            boundaryY < 10
          ) {
            const isShipCell = ship.coords.some(
              ([shipX, shipY]) => shipX === boundaryX && shipY === boundaryY,
            );
            if (!isShipCell) {
              // this.board[boundaryX][boundaryY].isBoundary = true
              ship.boundary.push([boundaryX, boundaryY]);
            }
          }
        }
      }
    });
  }

  placeShip(ship, x, y, direction) {
    if (this.checkPlacement(ship, x, y, direction)) {
      if (this.board[x][y].hasShip === true) {
        return "Invalid position";
      } else {
        const lenght = ship.length;
        if (direction === "vertical") {
          // check valid vertical placement
          if (x >= 0 && x + lenght <= 10 && y >= 0 && y < 10) {
            const changeSpots = [];

            for (let i = 0; i < lenght; i++) {
              if (i === 0) {
                this.board[x][y].role = "anchor";
                this.board[x][y].hasShip = true;
                this.board[x][y].value = ship;
                changeSpots.push([x, y]);
              } else {
                if (this.board[x + 1][y].hasShip === false) {
                  this.board[x + 1][y].role = "pointer";
                  this.board[x + 1][y].hasShip = true;
                  this.board[x + 1][y].value = ship;
                  changeSpots.push([x + 1, y]);
                  x += 1;
                } else {
                  changeSpots.forEach((spot) => {
                    this.board[spot[0]][spot[1]].hasShip = false;
                    this.board[spot[0]][spot[1]].role = null;
                    this.board[spot[0]][spot[1]].value = null;
                  });
                  return "Invalid position";
                }
              }
            }

            changeSpots.forEach((spot) => {
              ship.coords.push(spot);
            });
          } else {
            return "Invalid position";
          }
        } else if (direction === "horizontal") {
          // check horizontal postion
          if (y >= 0 && y + lenght <= 10 && x >= 0 && x < 10) {
            const changeSpots = [];

            for (let i = 0; i < lenght; i++) {
              if (i === 0) {
                this.board[x][y].role = "anchor";
                this.board[x][y].hasShip = true;
                this.board[x][y].value = ship;
                changeSpots.push([x, y]);
              } else {
                if (this.board[x][y + 1].hasShip === false) {
                  this.board[x][y + 1].role = "pointer";
                  this.board[x][y + 1].hasShip = true;
                  this.board[x][y + 1].value = ship;
                  changeSpots.push([x, y + 1]);
                  y += 1;
                } else {
                  changeSpots.forEach((spot) => {
                    this.board[spot[0]][spot[1]].hasShip = false;
                    this.board[spot[0]][spot[1]].role = null;
                    this.board[spot[0]][spot[1]].value = null;
                  });
                  return "Invalid position";
                }
              }
            }

            changeSpots.forEach((spot) => {
              ship.coords.push(spot);
            });
          } else {
            return "Invalid position";
          }
        }
      }
      this.setShipBoundary(ship);
    } else {
      return "Invalid position";
    }
  }

  removeShip(ship) {
    if (ship.coords.length > 0) {
      ship.coords.forEach((coord) => {
        this.board[coord[0]][coord[1]].hasShip = false;
        this.board[coord[0]][coord[1]].role = null;
        this.board[coord[0]][coord[1]].value = null;
      });

      ship.coords = [];
      ship.boundary = [];
    }
  }

  randomPlacement(ship) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    const dirNum = Math.floor(Math.random() * 2);
    let direction;
    if (dirNum === 0) {
      direction = "vertical";
    } else {
      direction = "horizontal";
    }

    const validPlacement = this.placeShip(ship, x, y, direction);
    if (validPlacement === "Invalid position") {
      return this.randomPlacement(ship);
    } else {
      return;
    }
  }

  placeShipRandom() {
    this.ships.forEach((ship) => this.removeShip(ship));

    this.ships.forEach((ship) => {
      this.randomPlacement(ship);
    });
  }

  placeShipDefault() {
    this.placeShip(this.ship1, 0, 2, "horizontal");

    this.placeShip(this.ship2, 1, 7, "vertical");

    this.placeShip(this.ship3, 5, 7, "vertical");

    this.placeShip(this.ship4, 4, 9, "vertical");

    this.placeShip(this.ship5, 5, 0, "vertical");

    this.placeShip(this.ship6, 9, 5, "horizontal");

    this.placeShip(this.ship7, 7, 3, "horizontal");

    this.placeShip(this.ship8, 2, 3, "vertical");

    this.placeShip(this.ship9, 8, 9, "vertical");

    this.placeShip(this.ship10, 2, 5, "vertical");
  }

  receiveAttack(x, y) {
    const target = this.board[x][y];
    if (target.hit === true) {
      const message = "Loction has already been atacked";
      return message;
    } else if (target.hasShip === false) {
      target.hit = true;
    } else {
      target.value.hit();
      target.value.isSunk();
      target.hit = true;
    }
  }

  checkShipSunk() {
    let sunkCount = 0;
    this.ships.forEach((ship) => {
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
