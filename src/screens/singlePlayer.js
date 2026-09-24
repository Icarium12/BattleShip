import { renderBoard, renderOppBoard, createBoardContainer, renderShips } from "../ui/renderBoard";
import { Player } from "../player";
import { setTarget, dragAndDrop, hit, checkWin } from "../ui/interactions";
import { button1, button2, playerBoardCont, oppBoardCont, winPopup, shipCont, playerCont } from "..";
import { computerMove } from "../game/ai";

import targetImg from "../target.jpg";

let computerMoveTimer;

export function singlePlayer(container) {

    const dialog = document.createElement('dialog');
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    })
    const form = document.createElement('form');
    form.className = "playerForm";
    const playerLabel = document.createElement('label');
    playerLabel.textContent = "Player Name:";
    form.appendChild(playerLabel);

    const input = document.createElement('input');
    input.type = 'text';
    input.required = true;
    input.addEventListener("change", () => {
        if (input.value.trim() === '') {
            input.setCustomValidity("Field cannot be empty");
            form.reportValidity();
        }
        else {
            input.setCustomValidity("");
        }
    })
    form.appendChild(input);

    const button = document.createElement('button');
    button.textContent = "Start";
    button.type = "button";
    button.addEventListener('click', () => {
        if (form.checkValidity()) {
            container.replaceChildren();
            button1.remove();
            button2.remove();

            dialog.close();

            const newPlayerBoard = createBoardContainer(); 

            container.appendChild(shipCont);
            container.appendChild(newPlayerBoard);
            const player = new Player("user", input.value);
            player.playerBoard.createBoard();
            player.playerBoard.placeShipDefault();
            renderShips(player.playerBoard, shipCont, newPlayerBoard);
            renderBoard(player.playerBoard, newPlayerBoard);

            dragAndDrop(player.playerBoard, newPlayerBoard);

            const start = document.createElement('button');
            start.textContent = "Start Game";
            start.addEventListener("click", () => {
                const buttons = container.querySelectorAll('button');

                shipCont.remove();

                buttons.forEach(button => {
                    button.remove();
                });

                newPlayerBoard.style.pointerEvents = 'none';

                // The activePlayer is tracked with both a player number and the board owner.
                // This clears up confusion when switching between turns and not confuse whose 
                // board is under attack

                const gameState = {
                    activePlayer: 1,
                    boardOwner: 2,
                    compTargets: []
                }

                const computer = new Player('computer', 'computer');
                computer.playerBoard.createBoard();
                computer.playerBoard.placeShipRandom();
                oppBoardCont.replaceChildren();
                container.appendChild(oppBoardCont);
                renderOppBoard(computer.playerBoard, oppBoardCont);

                const image = document.createElement("img");
                image.src = targetImg;

                const playerArea = document.createElement("div");
                playerArea.className = "player-area";

                const boardName = document.createElement('div');
                boardName.className = "player-board-name";
                boardName.textContent = `${player.name} Board`;

                playerArea.appendChild(boardName);

                playerArea.appendChild(newPlayerBoard);

                const opponentArea = document.createElement("div");
                opponentArea.className = "opponent-area";

                const oppName = document.createElement("div");
                oppName.className = "opp-name";
                oppName.textContent = "Computer Board";
                opponentArea.appendChild(oppName);

                opponentArea.appendChild(oppBoardCont);


                const fireBtn = document.createElement('button');
                opponentArea.appendChild(fireBtn);
                fireBtn.classList.add("fire");
                fireBtn.textContent = "fire";
                fireBtn.disabled = true;


                playerCont.appendChild(playerArea);
                playerCont.appendChild(opponentArea);

                const activeShadow =
                    "0 0 0 4px rgba(217, 93, 93, 0.85), 0 8px 18px rgba(18, 59, 93, 0.18)";

                oppBoardCont.style.boxShadow = activeShadow;

                let selectedSquare = null;

                fireBtn.addEventListener("click", () => {
                    if (!selectedSquare) return;
                    if (gameState.activePlayer !== 1 || gameState.boardOwner !== 2) return;

                    const coord = JSON.parse(selectedSquare.dataset.myArray);
                    const cell = computer.playerBoard.board[coord[0]][coord[1]];
                    

                    if (cell.hit) return;

                    gameState.activePlayer = 2;
                    gameState.boardOwner = 1;

                    hit(coord[0], coord[1], computer.playerBoard);

                    if (cell.hasShip) {
                        const ship = cell.value;
                        selectedSquare.textContent = "X";
                        selectedSquare.classList.add("hit");
                        selectedSquare.style.border = "2px solid red";
                        oppBoardCont.style.boxShadow = activeShadow;

                        gameState.activePlayer = 1;
                        gameState.boardOwner = 2;

                        if (ship.sunk) {
                            ship.boundary.forEach(([x ,y]) => {
                                computer.playerBoard.board[x][y].hit = true;
                                const boundarySquare = [...oppBoardCont.children].find(square => {
                                    const [squareX, squareY] = JSON.parse(square.dataset.myArray);
                                    return squareX === x && squareY === y;
                                })

                                if (boundarySquare) {
                                    boundarySquare.textContent = "•";
                                    boundarySquare.classList.add("miss");
                                }
                            })
                        }
                    }
                    else {
                        selectedSquare.textContent = "•";
                        selectedSquare.classList.add("miss");
                        
                        oppBoardCont.style.boxShadow = "none";
                        newPlayerBoard.style.boxShadow = "none";


                        computerMoveTimer = setTimeout(() => {
                            computerMove(player.playerBoard, oppBoardCont, newPlayerBoard, gameState, computer);
                        }, 1000);
                    }
                    let win = computer.playerBoard.checkShipSunk();
                    checkWin(win, player);
                });
                


                const oppSquares = oppBoardCont.querySelectorAll(".square");
                oppSquares.forEach(square => {
                    square.addEventListener("click", () => {
                        selectedSquare = setTarget(square, image, fireBtn, computer);
                    })

                    
                    
                });
            })
            container.appendChild(start);   
        }
        else {
            form.reportValidity();
        }
        

    });
    form.appendChild(button);

    const close = document.createElement('button');
    close.className = "close";
    close.textContent = "Close";
    close.addEventListener("click", () => {
        dialog.close();
        dialog.replaceChildren();
    });
    form.appendChild(close);

    dialog.appendChild(form);
    document.body.append(dialog);
    dialog.showModal();
}


export function resetGame(container) {
    winPopup.classList.remove("show");
    winPopup.replaceChildren();

    playerCont.style.pointerEvents = "auto";

    playerBoardCont.style.pointerEvents = "auto";
    playerBoardCont.style.boxShadow = "none";
    oppBoardCont.style.pointerEvents = "auto";
    oppBoardCont.style.boxShadow = "none";

    container.replaceChildren();
    shipCont.replaceChildren();
    clearTimeout(computerMoveTimer);
}