import { Player } from "./player";
import { playerCont, playerBoardCont, oppBoardCont, winPopup, shipCont, button1, button2 } from ".";
import targetImg from "./target.jpg";

export function renderBoard(gameboard, boardCont) {
    boardCont.replaceChildren();
    boardCont.className = "gameboard";
    let boardArray;
    if (gameboard && gameboard.board) {
        boardArray = gameboard.board;
    } else {
        boardArray = gameboard;
    }
    if (!boardArray || !boardArray.length) return;
    for (let i = 0; i < boardArray.length; i++) {
        for (let j = 0; j < boardArray[i].length; j++) {
            const square = document.createElement('div');
            const coordinates = [i, j];
            square.dataset.myArray = JSON.stringify(coordinates);
            square.classList.add("square")
            if (boardArray[i][j].hasShip === true) {
                square.dataset.shipId = boardArray[i][j].value.id
                square.style.border = "2px solid blue";
                square.classList.add("square",'ship');
                if (boardArray[i][j].hit) {
                    square.textContent = "X";
                }
            }
            else {
                square.style.border = "1px solid black";
                if (boardArray[i][j].hit) {
                    square.textContent = ".";
                }
            }

            boardCont.append(square);
        }
    }

}

export function renderOppBoard(gameboard, boardCont) {
    // const boardCont = document.createElement('div');
    boardCont.className = "gameboard";    
    let boardArray;
    if (gameboard && gameboard.board) {
        boardArray = gameboard.board;
    } else {
        boardArray = gameboard;
    }
    if (!boardArray || !boardArray.length) return;
    for (let i = 0; i < boardArray.length; i++) {
        for (let j = 0; j < boardArray[i].length; j++) {
            const square = document.createElement('div');
            const coordinates = [i, j];
            square.dataset.myArray = JSON.stringify(coordinates);
            square.className = 'square';
            square.style.border = "1px solid black";
            
            boardCont.append(square);
            if (boardArray[i][j].hasShip) {
                if (boardArray[i][j].hit) {
                    square.textContent = "X";
                }
            }
            else {
                if (boardArray[i][j].hit) {
                    square.textContent = ".";
                }
            }
        }
        
    } 
}

function renderShips(gameboard, cont, boardCont) {
    const random = document.createElement('button');

    random.textContent = "Randomize Placement";
    random.addEventListener('click', () => {
        gameboard.placeShipRandom();
        renderBoard(gameboard, boardCont);
        // playerCont.prepend(random);
        // cont.remove();
    })
    cont.appendChild(random);
    // gameboard.ships.forEach(ship => {
    //     const length = ship.length;
    //     const shipCont = document.createElement('div');
    //     shipCont.className = "ship-holder";
    //     for (let i = 0; i < length; i++) {
    //         const shipSq = document.createElement('div');
    //         shipSq.className = "ship-pl";
    //         shipSq.dataset.value = ship;
    //         shipCont.appendChild(shipSq);

    //         cont.appendChild(shipCont);
    //     }

        

    //     const dialog =  document.createElement('dialog');

    //     const shipCont2 = shipCont.cloneNode(true);

    //     dialog.appendChild(shipCont2);

    //     const label = document.createElement('label');
    //     label.textContent = "Change ship orientation: ";
    //     dialog.appendChild(label);

    //     const shipDirection = document.createElement('select');
    //     shipDirection.name = "set-ship-direction";

    //     const option1 = document.createElement('option');
    //     option1.value = "horizontal";
    //     option1.textContent = "horizontal";
    //     shipDirection.appendChild(option1);

    //     const option2 = document.createElement('option');
    //     option2.value = "vertical";
    //     option2.textContent = "vertical";
    //     shipDirection.appendChild(option2);

    //     shipDirection.addEventListener('change', () => {
    //         if (shipDirection.value === "vertical") {
    //             shipCont2.style.flexDirection = "column";
    //         }
    //         else if (shipDirection.value === "horizontal") {
    //             shipCont2.style.flexDirection = "row";
    //         }
    //     })
    //     dialog.appendChild(shipDirection);

    //     const boardCont = document.createElement('div');
    //     boardCont.className = "place-ship-board";
    //     renderBoard(gameboard, cont, boardCont);
    //     dialog.appendChild(boardCont);

    //     const setShip = document.createElement('button');
    //     setShip.type = "button";
    //     setShip.textContent = "Confirm Placement";
    //     setShip.addEventListener('click', () => {
    //         dialog.close();
    //         shipCont.remove();
    //         renderBoard(gameboard, cont, playerBoardCont);
    //         shipAdd++

    //         if (shipAdd === 10) {
    //             cont.remove();
    //         }
    //     })
    //     dialog.appendChild(setShip);

    //     const removeShip = document.createElement('button');
    //     removeShip.type = "button";
    //     removeShip.textContent = "Remove ship";
    //     removeShip.addEventListener('click', () => {
    //         gameboard.removeShip(ship);
    //         renderBoard(gameboard, cont, boardCont);
    //         squareClicks(boardCont, gameboard, ship, shipDirection, cont);
    //     })
    //     dialog.appendChild(removeShip);

    //     document.body.appendChild(dialog);

    //     const placeShip = document.createElement('button');
    //     placeShip.textContent = "Place Ship";
    //     placeShip.addEventListener('click', () => {
    //         renderBoard(gameboard, cont, boardCont);
    //         squareClicks(boardCont, gameboard, ship, shipDirection, cont);
    //         dialog.showModal();
            
    //     })
    //     shipCont.appendChild(placeShip);
    // })
}

function squareClicks(boardCont, gameboard, ship, shipDirection, cont) {
    const squares = boardCont.childNodes;
    squares.forEach(square => {
    square.addEventListener('click', () => {
        const coordString = square.dataset.myArray;
        const coord = JSON.parse(coordString);
        const x = coord[0];
        const y = coord[1];
        const direction = shipDirection.value;
        const validPlacement = gameboard.placeShip(ship, x, y, direction);

        if (validPlacement === "Invalid position") {
            alert(validPlacement);
            
        }
        else {
            renderBoard(gameboard, boardCont);
            renderBoard(gameboard, playerBoardCont); 
        }

        })
    })
}

function dragAndDrop(gameboard, boardCont) {

    let activePiece = null;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let anchorOffsetX = 0;
    let anchorOffsetY = 0;
    let validPlacement = false;
    let draggedShip = null;
    let oldCoords = null;
    let oldDirection = null;
    let dragPieces = [];
    
    boardCont.addEventListener('pointerdown', (e) => {
        if (!e.target.classList.contains('ship')) return;

        activePiece = e.target;
        activePiece.setPointerCapture(e.pointerId);

        const shipId = activePiece.dataset.shipId;
        const relatedPieces = [
            ...boardCont.querySelectorAll(`[data-ship-id="${shipId}"]`)
        ];

        relatedPieces.forEach((piece) => {
            piece.style.pointerEvents = "none";
        })

        dragPieces = relatedPieces.map(piece => {
            const clone = piece.cloneNode(true);
            const rect = piece.getBoundingClientRect();
            const boardRect = boardCont.getBoundingClientRect();

            clone.classList.add("drag-preview");

            clone.style.width = `${rect.width}px`;
            clone.style.height = `${rect.height}px`;
            clone.style.left = `${rect.left - boardRect.left}px`;
            clone.style.top = `${rect.top - boardRect.top}px`;

            boardCont.appendChild(clone);
            return clone;
        });

        relatedPieces.forEach(piece => {
            piece.style.pointerEvents = "none";
        })

        const ship = gameboard.board[
            JSON.parse(activePiece.dataset.myArray)[0]
        ][
            JSON.parse(activePiece.dataset.myArray)[1]
        ].value;

        const anchorCoords = ship.coords[0];

        const anchorPiece = relatedPieces.find((piece) => {
            const coords = JSON.parse(piece.dataset.myArray);
            return coords[0] === anchorCoords[0] &&
                   coords[1] === anchorCoords[1];
        });

        const anchorRect = anchorPiece.getBoundingClientRect();

        anchorOffsetX = anchorRect.left + anchorRect.width / 2 - e.clientX;
        anchorOffsetY = anchorRect.top + anchorRect.height / 2 - e.clientY

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        const coords = JSON.parse(activePiece.dataset.myArray);
        draggedShip = gameboard.board[coords[0]][coords[1]].value;

        oldCoords =  draggedShip.coords.map(coord => [...coord]);
        oldDirection = draggedShip.coords.length > 1 &&
        draggedShip.coords[0][0] !== draggedShip.coords[1][0]
        ? "vertical"
        : "horizontal";

        validPlacement = true;
    })

    boardCont.addEventListener('pointermove', (e) => {
        if (!activePiece) return;

        const boardRect = boardCont.getBoundingClientRect();
        const previewRect = dragPieces[0].getBoundingClientRect();

        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;

        const nextLeft = Math.max(
            0,
            Math.min(
                parseFloat(dragPieces[0].style.left) + deltaX,
                boardRect.width - previewRect.width
            )
        );

        const nextTop = Math.max(
            0,
            Math.min(
                parseFloat(dragPieces[0].style.top) + deltaY,
                boardRect.height - previewRect.height
            )
        );

        const anchorX = e.clientX + anchorOffsetX;
        const anchorY = e.clientY + anchorOffsetY;

        const shipId = activePiece.dataset.shipId;
        const relatedPieces = boardCont.querySelectorAll(`[data-ship-id="${shipId}"]`);

        const currentLeft = parseFloat(dragPieces[0].style.left) || 0;
        const currentTop = parseFloat(dragPieces[0].style.top) || 0;

        const movementX = nextLeft - currentLeft;
        const movementY = nextTop - currentTop;

        dragPieces.forEach(piece => {
            const pieceLeft = parseFloat(piece.style.left) || 0;
            const piecetTop = parseFloat(piece.style.top) || 0;

            piece.style.left = `${pieceLeft + movementX}px`;
            piece.style.top = `${piecetTop + movementY}px`;
        });

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        let coords = JSON.parse(activePiece.dataset.myArray);
        let x = coords[0];
        let y = coords[1];

        if (gameboard.board[x][y].role === 'anchor') {
            const target = document.elementFromPoint(anchorX, anchorY);
            const square = target?.closest(".square");

            if (!square?.dataset.myArray){
                validPlacement = false;
                return;
            } 
            const newCoords = JSON.parse(square.dataset.myArray);
            let newX = newCoords[0];
            let newY = newCoords[1];
            // let ship = gameboard.board[x][y].value;

            // const oldCoords = ship.coords.map(coord => [...coord]);
            // const oldDirection = ship.coords.length > 1 &&
            //     ship.coords[0][0] !== ship.coords[1][0]
            //     ? "vertical"
            //     : "horizontal";
            
            gameboard.removeShip(draggedShip);
            validPlacement = gameboard.checkPlacement(draggedShip, newX, newY, oldDirection);

            gameboard.placeShip(
                    draggedShip,
                    oldCoords[0][0],
                    oldCoords[0][1],
                    oldDirection
                );

            const placementClass = validPlacement
                ? "ship-placement-valid"
                : "ship-placement-invalid";
            relatedPieces.forEach((piece) => {
                piece.classList.remove(
                    "ship-placement-valid",
                    "ship-placement-invalid"
                );
                piece.classList.add(placementClass);
            });  

            // if (!validPlacement) {
            //     const placementClass = validPlacement
            //         ? "ship-placement-valid"
            //         : "ship-placement-invalid";
            //     relatedPieces.forEach((piece) => {
            //         piece.classList.remove(
            //             "ship-placement-valid",
            //             "ship-placement-invalid"
            //         );
            //         piece.classList.add(placementClass);
            //     });    
            // }
            
            // else {
            //     const placementClass = validPlacement
            //         ? "ship-placement-valid"
            //         : "ship-placement-invalid";
            //     relatedPieces.forEach((piece) => {
            //         piece.classList.remove(
            //             "ship-placement-valid",
            //             "ship-placement-invalid"
            //         );
            //         piece.classList.add(placementClass);
            //     })
            // }
        }
        else {
            for (const piece of relatedPieces) {
                let coords = JSON.parse(piece.dataset.myArray);
                let x = coords[0];
                let y = coords[1];

                if (gameboard.board[x][y].role === 'anchor') {
                    const target = document.elementFromPoint(anchorX, anchorY);
                    const square = target?.closest(".square");

                    if (!square?.dataset.myArray) return;
                    const newCoords = JSON.parse(square.dataset.myArray);
                    let newX = newCoords[0];
                    let newY = newCoords[1];
                    // let ship = gameboard.board[x][y].value;

                    // const oldCoords = ship.coords.map(coord => [...coord]);
                    // const oldDirection = ship.coords.length > 1 &&
                    //     ship.coords[0][0] !== ship.coords[1][0]
                    //     ? "vertical"
                    //     : "horizontal";
                    
                    gameboard.removeShip(draggedShip);
                    validPlacement = gameboard.checkPlacement(draggedShip, newX, newY, oldDirection);

                    
                   gameboard.placeShip(
                        draggedShip,
                        oldCoords[0][0],
                        oldCoords[0][1],
                        oldDirection
                    );

                    const placementClass = validPlacement
                        ? "ship-placement-valid"
                        : "ship-placement-invalid";
                    relatedPieces.forEach((piece) => {
                        piece.classList.remove(
                            "ship-placement-valid",
                            "ship-placement-invalid"
                        );
                        piece.classList.add(placementClass);
                    });

                    // if (!validPlacement) {
                    //     relatedPieces.forEach(p => {
                    //         p.style.border = "2px solid red";
                    //     });
                    // }
                    // else {
                    //     relatedPieces.forEach(p => {
                    //         p.style.border = "2px solid blue";
                    //     });
                    // }

                    break;

                }
            }
        }
    });


    boardCont.addEventListener('pointerup', (e) => {
        if (!activePiece) return;

        dragPieces.forEach(piece => piece.remove());
        dragPieces = [];

        const anchorX = e.clientX + anchorOffsetX;
        const anchorY = e.clientY + anchorOffsetY;

        const target = document.elementFromPoint(anchorX, anchorY);
        const square = target?.closest(".square");
        
        if (validPlacement && square?.dataset.myArray) {
            const origin = JSON.parse(activePiece.dataset.myArray);
            const ship = gameboard.board[origin[0]][origin[1]].value

            

            // if (!square?.dataset.myArray) return;
            const newCoords = JSON.parse(square.dataset.myArray);
            const newX = newCoords[0];
            const newY = newCoords[1];

            // const oldDirection = ship.coords.length > 1 &&
            //             ship.coords[0][0] !== ship.coords[1][0]
            //             ? "vertical"
            //             : "horizontal";
            
            gameboard.removeShip(draggedShip);

            gameboard.placeShip(
                draggedShip,
                newX,
                newY,
                oldDirection
            )

            renderBoard(gameboard, boardCont);
            activePiece = null;
            
        }
        dragPieces.forEach(piece => piece.remove());
        dragPieces = [];
        renderBoard(gameboard, boardCont);

        activePiece = null;
        draggedShip = null;
        validPlacement = false;
        // else {
        //     renderBoard(gameboard, boardCont);
        //     activePiece = null;
        // }
    })
}

function waitForClick(element) {
    return new Promise(resolve => {
        element.addEventListener('click', function handler() {
            element.removeEventListener('click', handler);
            resolve();
        })
    })
}

function hit(x, y, gameboard) {
    gameboard.receiveAttack(x, y);
}

function getAvailableTargets(gameboard, gameState) {
    const targets = [];

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const cell = gameboard.board[x][y];

            if (!cell.hit) {
                targets.push([x, y]);
            }
        }
    }

    return targets;
}

function getNeighbors(x, y, gameboard) {
    const neighbors = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ];

    return neighbors.filter(([nextX, nextY]) => 
        nextX >=0 && nextX < 10 &&
        nextY >=0 && nextY < 10 &&
        !gameboard.board[nextX][nextY].hit  
    );
}

function chooseTarget(gameboard, gameState) {
    gameState.compTargets = gameState.compTargets.filter(
        ([x, y]) => !gameboard.board[x][y].hit
    );

    if (gameState.compTargets.length > 0) {
        return gameState.compTargets.shift();
    }

    const huntTargets = getAvailableTargets(gameboard, gameState);

    if (huntTargets.length > 0) {
        return huntTargets[Math.floor(Math.random() * huntTargets.length)];
    }

    return null;
}

function computerMove (gameboard, 
                        boardCont, 
                        oppBoardCont, 
                        gameState) {
    
    if(gameState.activePlayer !== 2 || gameState.boardOwner !== 1) return;
    
    const target = chooseTarget(gameboard, gameState);

    if (!target) return;

    const [x, y] = target;
    const cell = gameboard.board[x][y];

    hit (x, y, gameboard);

    const square = [...oppBoardCont.children].find(square => {
        const coordinates = JSON.parse(square.dataset.myArray);
        return coordinates[0] === x && coordinates[1] === y;
    });

    if (cell.hasShip) {
        square.textContent ="X";

        if (cell.value.sunk) {
            gameState.compTargets = [];
            cell.value.boundary.forEach(([x, y]) => {
                gameboard.board[x][y].hit = true;
                const boundarySquare = [...oppBoardCont.children].find(square => {
                    const [squareX, squareY] = JSON.parse(square.dataset.myArray);
                    return squareX === x && squareY === y;
                })

                if (boundarySquare) {
                    boundarySquare.textContent = ".";
                }
            });

        } 
        else {
            gameState.compTargets.unshift(...getNeighbors(x, y, gameboard));
        }

        setTimeout(() => {
            computerMove(gameboard, boardCont, oppBoardCont, gameState);
        }, 1000);

        return;
    }

    square.textContent = "."

    oppBoardCont.style.backgroundColor = "#f5f5f5";
    boardCont.style.backgroundColor = "#ffffff";
    
    gameState.activePlayer = 1;
    gameState.boardOwner = 2;

    let win = gameboard.checkShipSunk();
    if (win != null) {
        winPopup.replaceChildren();
        winPopup.style.color = "red";
        winPopup.textContent = "You lose";

        const playAgn = document.createElement('div');
        playAgn.textContent = "Play again";
        winPopup.appendChild(playAgn);

        const sinOrMul = document.createElement('div');

        sinOrMul.appendChild(button1);
        sinOrMul.appendChild(button2);
        winPopup.appendChild(sinOrMul);

        winPopup.classList.add('show');
        playerCont.appendChild(winPopup);
        playerCont.style.pointerEvents = 'none';
    }
     
}

export function createPlayer(container) {

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

            container.appendChild(shipCont);
            container.appendChild(playerBoardCont);
            const player = new Player("user", input.value);
            player.playerBoard.createBoard();
            player.playerBoard.placeShipDefault();
            renderShips(player.playerBoard, shipCont, playerBoardCont);
            renderBoard(player.playerBoard, playerBoardCont);

            dragAndDrop(player.playerBoard, playerBoardCont);

            const start = document.createElement('button');
            start.textContent = "Start Game";
            start.addEventListener("click", () => {
                const buttons = container.querySelectorAll('button');

                shipCont.remove();

                buttons.forEach(button => {
                    button.remove();
                });

                playerBoardCont.style.pointerEvents = 'none';

                const gameState = {
                    activePlayer: 1,
                    boardOwner: 2,
                    compTargets: []
                }

                const computer = new Player('computer', 'computer');
                computer.playerBoard.createBoard();
                computer.playerBoard.placeShipDefault();
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

                playerArea.appendChild(playerBoardCont);

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
                        selectedSquare.style.border = "2px solid red";

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
                                    boundarySquare.textContent = ".";
                                }
                            })
                        }
                    }
                    else {
                        selectedSquare.textContent = ".";
                        oppBoardCont.style.backgroundColor = "#f5f5f5";
                        playerBoardCont.style.backgroundColor = "#ffffff";

                        setTimeout(() => {
                            computerMove(player.playerBoard, oppBoardCont, playerBoardCont, gameState);
                        }, 1000);
                    }
                    let win = computer.playerBoard.checkShipSunk();
                    checkWin(win, player);
                });

                // oppBoardCont.appendChild(fireBtn);

                const oppSquares = oppBoardCont.querySelectorAll(".square");
                oppSquares.forEach(square => {
                    square.addEventListener("click", () => {
                        selectedSquare = setTarget(square, image, fireBtn, computer);
                    })

                    
                    
                });

                // oppBoardCont.addEventListener('click', () => {
                //     let win = computer.playerBoard.checkShipSunk();
                //     checkWin(win, player);
                // });
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
    oppBoardCont.style.pointerEvents = "auto";

    container.replaceChildren();
}

function checkWin(win, player) {
    if (win !== null) {
        winPopup.textContent = `${player.name} wins`;

        const playAgn = document.createElement('div');
        playAgn.textContent = "Play again";
        winPopup.appendChild(playAgn);

        const sinOrMul = document.createElement('div');

        sinOrMul.appendChild(button1);
        sinOrMul.appendChild(button2);
        winPopup.appendChild(sinOrMul);

        winPopup.classList.add('show');
        
        playerCont.appendChild(winPopup);
        playerBoardCont.style.pointerEvents = 'none';
        oppBoardCont.style.pointerEvents = 'none'
        // playerCont.style.pointerEvents = 'none';
    }
}

function startGame(container, player1, player2) {
    const gameState = {
        activePlayer: 1,
        boardOwner: 2
    }

    const player1Cont = document.createElement('div');
    player1Cont.classList.add("player-cont");
    // player1Cont.classList.add("player-panel");

    const player2Cont = document.createElement('div');
    player2Cont.classList.add("player-cont");
    // player2Cont.classList.add("player-panel");
    player2Cont.classList.add("hide");

    container.appendChild(player1Cont);
    container.appendChild(player2Cont);

    const p1Board = document.createElement('div');
    p1Board.classList.add("gameboard");
    player1Cont.appendChild(p1Board);
    renderBoard(player1.playerBoard, p1Board);

    const opp1Board = document.createElement('div');
    opp1Board.classList.add("gameboard");
    player1Cont.appendChild(opp1Board);
    renderOppBoard(player2.playerBoard, opp1Board);

    const p2Board = document.createElement('div');
    p2Board.classList.add("gameboard");
    player2Cont.appendChild(p2Board);
    renderBoard(player2.playerBoard, p2Board);

    const opp2Board = document.createElement('div');
    opp2Board.classList.add("gameboard");
    player2Cont.appendChild(opp2Board);
    renderOppBoard(player1.playerBoard, opp2Board);

    const switchScreen = document.createElement('div');
    switchScreen.classList.add("switch");
    switchScreen.classList.add("hide");

    const switchText = document.createElement('div');
    switchText.classList.add("switch-title");
    switchScreen.appendChild(switchText);
    const switchButton = document.createElement("button");
    switchButton.textContent = "Ready";
    switchButton.addEventListener('click', () => {
        if (gameState.activePlayer === 1) {
            // player2Cont.classList.add("hide");
            switchScreen.classList.add("hide");
            player1Cont.classList.remove("hide");

        }
        else if (gameState.activePlayer === 2) {
            switchScreen.classList.add("hide");
            player2Cont.classList.remove("hide");
        }
    })
    switchScreen.appendChild(switchButton);
    container.appendChild(switchScreen);

    const image = document.createElement("img");
    image.src = targetImg;

    const playerArea = document.createElement("div");
    playerArea.className = "player-area";

    const myTitle = document.createElement("div");
    myTitle.className =  "player-board-name";
    myTitle.textContent = `${player1.name} board`;

    const opponentArea = document.createElement("div");
    opponentArea.className = "opponent-area";

    const oppTitle = document.createElement("div");
    oppTitle.className = "opp-name";
    oppTitle.textContent = `${player2.name} board`;

    const fireBtn = document.createElement('button');
    fireBtn.classList.add("fire");
    fireBtn.textContent = "fire";
    fireBtn.disabled = true;

    let selectedSquare1 = null;

    fireBtn.addEventListener('click', () => {
        fire(selectedSquare1, gameState, player2, 1, 2, player1Cont, opp1Board, switchText, switchScreen, p2Board);

        let win = player2.playerBoard.checkShipSunk();
        checkWin(win, player1);
    });

    playerArea.appendChild(myTitle);
    playerArea.appendChild(p1Board);

    opponentArea.appendChild(oppTitle);
    opponentArea.appendChild(opp1Board);
    opponentArea.appendChild(fireBtn);
     
    player1Cont.appendChild(playerArea);
    player1Cont.appendChild(opponentArea);
    // opp1Board.appendChild(fireBtn);

    const opp1Squares = opp1Board.querySelectorAll(".square");
    opp1Squares.forEach(square => {
        square.addEventListener('click', () => {
            selectedSquare1 = setTarget(square, image, fireBtn, player2);
        });
    });

    // opp1Board.addEventListener('click', () => {
    //     let win = player2.playerBoard.checkShipSunk();
    //     checkWin(win, player1);
    // });

    let selectedSquare2 = null;

    const player2Area = document.createElement('div');
    player2Area.className = "player-area";

    const myTitle2 = document.createElement('div');
    myTitle2.className =  "player-board-name";
    myTitle2.textContent = `${player2.name} board`;

    const opponentArea2 = document.createElement('div');
    opponentArea2.className = "opponent-area";
    
    const oppTitle2 = document.createElement('div');
    oppTitle2.className = "opp-name";
    oppTitle2.textContent = `${player1.name} board`;


    const fireBtn2 = fireBtn.cloneNode(true);
    fireBtn2.addEventListener('click', () => {
        fire(selectedSquare2, gameState, player1, 2, 1, player2Cont, opp2Board, switchText, switchScreen, p1Board);

        let win = player1.playerBoard.checkShipSunk();
        checkWin(win, player2);
    });

    player2Area.appendChild(myTitle2);
    player2Area.appendChild(p2Board);

    opponentArea2.appendChild(oppTitle2);
    opponentArea2.appendChild(opp2Board);
    opponentArea2.appendChild(fireBtn2);

    player2Cont.appendChild(player2Area);
    player2Cont.appendChild(opponentArea2);
    // opp2Board.appendChild(fireBtn2);

    const opp2Squares = opp2Board.querySelectorAll(".square");
    opp2Squares.forEach(square => {
        square.addEventListener('click', () => {
            selectedSquare2 = setTarget(square, image, fireBtn2, player1);
        });
    });

    // opp2Board.addEventListener('click', () => {
    //     let win = player1.playerBoard.checkShipSunk();
    //     checkWin(win, player2);
    // });
}

function setTarget(square, image, btn, player) {
    const coord = JSON.parse(square.dataset.myArray);
    const cell = player.playerBoard.board[coord[0]][coord[1]];
    image.classList.add("target-marker");

    if (cell.hit) return;

    image.remove();
    square.appendChild(image);
    btn.disabled = false;

    return square;
}

function fire(selectedSquare, gameState, player, playerNum, oppNumber, playerCont, oppCont, switchText, switchScreen, playerBoard) {
    if (!selectedSquare) return;
    if (gameState.activePlayer !== playerNum || gameState.boardOwner !== oppNumber) return;

    const coord = JSON.parse(selectedSquare.dataset.myArray);
    const cell = player.playerBoard.board[coord[0]][coord[1]];

    if (cell.hit) return;

    hit(coord[0], coord[1], player.playerBoard);

    if (cell.hasShip) {
        const ship = cell.value;
        selectedSquare.textContent = "X";
        selectedSquare.style.border = "2px solid red";

        gameState.activePlayer = playerNum;
        gameState.boardOwner = oppNumber;

        if (ship.sunk) {
            ship.boundary.forEach(([x, y]) => {
                player.playerBoard.board[x][y].hit = true;
                const boundarySquare = [...oppCont.children].find(square => {
                    const [squareX, squareY] = JSON.parse(square.dataset.myArray);
                    return squareX === x && squareY === y;
                })

                if (boundarySquare) {
                    boundarySquare.textContent = ".";
                }
            })
        }
    }

    else {
        selectedSquare.textContent = ".";

        gameState.activePlayer = oppNumber;
        gameState.boardOwner = playerNum;

        oppCont.style.pointerEvents = "none";
        setTimeout(() => {
            oppCont.style.pointerEvents = 'auto';
            playerCont.classList.add('hide');
            switchText.textContent = `Pass device to ${player.name}`;
            switchScreen.classList.remove('hide');    
        }, 1000);
    }

    renderBoard(player.playerBoard, playerBoard);
}

export function multiplayer(container) {
    const dialog = document.createElement('dialog');
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    })
    document.body.appendChild(dialog);

    const form = document.createElement('form');
    form.className = "playerForm";

    const player1Label = document.createElement('label');
    player1Label.textContent = "Player1 Name:";
    form.appendChild(player1Label);

    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.required = true;
    input1.addEventListener('change', () => {
        if (input1.value.trim() === '') {
            input1.setCustomValidity("Field cannot be empty");
            input1.reportValidity();
        }
        else {
            input1.setCustomValidity("");
        }
    });
    form.appendChild(input1);

    const player2Label = document.createElement('label');
    player2Label.textContent = "Player2 Name:";
    form.appendChild(player2Label);

    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.required = true;
    input2.addEventListener('change', () => {
        if (input2.value.trim() === '') {
            input2.setCustomValidity("Field cannot be empty");
            input2.reportValidity();
        }
        else {
            input2.setCustomValidity("");
        }
    });
    form.appendChild(input2);

    const submit = document.createElement('button');
    submit.textContent = "Submit";
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            async function playerSetup() {
                shipCont.replaceChildren();
                container.replaceChildren();
                button1.remove();
                button2.remove();

                dialog.close();
                const player1 = new Player("user", input1.value);
                player1.playerBoard.createBoard();

                const player2 = new Player("user", input2.value);
                player2.playerBoard.createBoard();

                const title = document.createElement('div');
                title.className = "switch-title";
                title.textContent = `${player1.name} press ready to place your shuips`;

                const switchScreen = document.createElement("div");
                switchScreen.className = "switch";

                const confirm = document.createElement('button');
                confirm.textContent = "Ready";

                switchScreen.appendChild(title);
                switchScreen.appendChild(confirm);

                container.appendChild(switchScreen);

                await waitForClick(confirm);

                container.replaceChildren();

                player1.playerBoard.placeShipDefault();
                renderBoard(player1.playerBoard.board, playerBoardCont);
                renderShips(player1.playerBoard, shipCont, playerBoardCont);
                dragAndDrop(player1.playerBoard, playerBoardCont);
                container.appendChild(shipCont);
                container.appendChild(playerBoardCont);

                confirm.textContent = "Ready";
                container.appendChild(confirm);

                await waitForClick(confirm);

                container.replaceChildren();
                

                title.textContent = `${player2.name} press ready to place your ships`;
                switchScreen.appendChild(title);

                confirm.textContent = "Ready";
                switchScreen.appendChild(confirm);

                container.appendChild(switchScreen);

                await waitForClick(confirm);

                container.replaceChildren();
                shipCont.replaceChildren();
                
                container.appendChild(shipCont);
                container.appendChild(playerBoardCont);

                const player2BoardCont = playerBoardCont.cloneNode(false);
                playerBoardCont.parentNode.replaceChild(player2BoardCont, playerBoardCont);
                
                player2.playerBoard.placeShipDefault();
                renderBoard(player2.playerBoard.board, player2BoardCont);
                renderShips(player2.playerBoard, shipCont, player2BoardCont);
                dragAndDrop(player2.playerBoard, player2BoardCont);

                confirm.textContent = "Confirm placement";
                container.appendChild(confirm);

                await waitForClick(confirm);

                container.replaceChildren();

                title.textContent = `Pass device to ${player1.name} then press start to begin`;
                confirm.textContent = "Start";
                switchScreen.appendChild(confirm);
                container.appendChild(switchScreen);

                await waitForClick(confirm);

                container.replaceChildren();

                startGame(container, player1, player2);

                
            }
            playerSetup();
        }
        else {
            form.reportValidity();
        }
    })
    form.appendChild(submit);

    const close = document.createElement('button');
    close.textContent = "Close";
    close.className = "close";
    close.addEventListener("click", () => {
        dialog.close();
        dialog.replaceChildren();
    });

    form.appendChild(close);
    dialog.appendChild(form);
    dialog.showModal();
} 