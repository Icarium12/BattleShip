import { renderBoard, createPlayer } from "./dom";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import "./styles.css";

const body = document.body;

const title = document.createElement('div');
title.textContent = "BattleShip Game"; 
body.append(title);

const button = document.createElement('button');
button.textContent = "Create Player";
button.addEventListener('click', () => {
    createPlayer();
})
body.appendChild(button);

const board = new Gameboard();
board.createBoard();
board.placeShipDefault();
renderBoard(board.board);