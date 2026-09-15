import { renderBoard, createPlayer, multiplayer } from "./dom";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import "./styles.css";

const body = document.body;

const title = document.createElement('div');
title.textContent = "BattleShip Game"; 
body.append(title);

const button1 = document.createElement('button');
button1.textContent = "Single Player";
button1.addEventListener('click', () => {
    const player = createPlayer(playerCont);
}, { once: true});
body.appendChild(button1);

const button2 = document.createElement('button');
button2.textContent = "Multiplayer";
button2.addEventListener('click', () => {
    multiplayer(playerCont);
});
body.appendChild(button2);

export const playerCont = document.createElement('div');
playerCont.className = "player-cont";

export const shipCont = document.createElement('div');
shipCont.className = "ships";

export const playerBoardCont = document.createElement('div');

export const oppBoardCont = document.createElement('div');
export const winPopup = document.createElement('div');
winPopup.textContent = "You win";
winPopup.className = "popup-overlay";

playerCont.appendChild(shipCont);
playerCont.appendChild(playerBoardCont);
playerCont.appendChild(oppBoardCont);

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