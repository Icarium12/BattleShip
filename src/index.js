import { renderBoard, createPlayer, multiplayer, resetGame } from "./dom";
import "./styles.css";

const body = document.body;

const title = document.createElement('div');
title.className = "game-title";
title.textContent = "BattleShip Game"; 
body.append(title);

const buttonCont = document.createElement('div');
buttonCont.className = "button-cont";
body.appendChild(buttonCont);

export const button1 = document.createElement('button');
button1.textContent = "Single Player";
button1.addEventListener('click', () => {
    resetGame(playerCont);
    const player = createPlayer(playerCont);
});
buttonCont.appendChild(button1);

export const button2 = document.createElement('button');
button2.textContent = "Multiplayer";
button2.addEventListener('click', () => {
    resetGame(playerCont);
    multiplayer(playerCont);
});
buttonCont.appendChild(button2);

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