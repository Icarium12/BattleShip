import { renderBoard } from "./dom";
import { Gameboard } from "./gameboard";
import "./styles.css";

const body = document.body;

const title = document.createElement('div');
title.textContent = "BattleShip Game"; 
body.append(title);

const board = new Gameboard();
board.createBoard();
board.placeShipDefault();
renderBoard(board.board);