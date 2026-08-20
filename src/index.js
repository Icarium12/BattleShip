import { renderBoard, createPlayer } from "./dom";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import "./styles.css";

const body = document.body;

const title = document.createElement('div');
title.textContent = "BattleShip Game"; 
body.append(title);

const button1 = document.createElement('button');
button1.textContent = "Create Player";
button1.addEventListener('click', () => {
    const player = createPlayer(playerCont);
});
body.appendChild(button1);

export const playerCont = document.createElement('div');
playerCont.className = "player-cont";

body.appendChild(playerCont);






// const board = new Gameboard();
// board.createBoard();
// console.log(board.board[0][0]);
// // board.placeShipDefault();
// // renderBoard(board.board);

// const player1 = new Player("user", "p1");
// player1.playerBoard.createBoard();
// console.log(player1.playerBoard.board[0][0]);
// renderBoard(player1.playerBoard);

function runGame () {

    
}