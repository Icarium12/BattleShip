import { renderBoard } from "./renderBoard";
import { button1, button2, playerBoardCont, oppBoardCont, winPopup, playerCont } from "../dom.js";

export function setTarget(square, image, btn, player) {
    const coord = JSON.parse(square.dataset.myArray);
    const cell = player.playerBoard.board[coord[0]][coord[1]];
    image.classList.add("target-marker");

    if (cell.hit) return;

    image.remove();
    square.appendChild(image);
    btn.disabled = false;

    return square;
}

export function fire(selectedSquare, gameState, player, playerNum, oppNumber, playerCont, oppCont, switchText, switchScreen, playerBoard) {
    if (!selectedSquare) return;
    if (gameState.activePlayer !== playerNum || gameState.boardOwner !== oppNumber) return;

    const coord = JSON.parse(selectedSquare.dataset.myArray);
    const cell = player.playerBoard.board[coord[0]][coord[1]];

    if (cell.hit) return;

    hit(coord[0], coord[1], player.playerBoard);

    if (cell.hasShip) {
        const ship = cell.value;
        selectedSquare.textContent = "X";
        selectedSquare.classList.add("hit");
        selectedSquare.style.border = "2px solid red";

        gameState.activePlayer = playerNum;
        gameState.boardOwner = oppNumber;

        // A sunk ship marks all surrounding cells as hit to prevent the computer/player
        // from targeting empty space adjacent to a destroyed ship

        if (ship.sunk) {
            ship.boundary.forEach(([x, y]) => {
                player.playerBoard.board[x][y].hit = true;
                const boundarySquare = [...oppCont.children].find(square => {
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

    //Re-render the board so the attack is reflected.
    renderBoard(player.playerBoard, playerBoard);
}

export function waitForClick(element) {
    return new Promise(resolve => {
        element.addEventListener('click', function handler() {
            element.removeEventListener('click', handler);
            resolve();
        })
    })
}

export function hit(x, y, gameboard) {
    gameboard.receiveAttack(x, y);
}

export function dragAndDrop(gameboard, boardCont) {
    // Dragging is done using a preview only; ship pieces are cloned, 
    // moved and only commit to the position during pointer up.

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

export function checkWin(win, player) {
    // this takes a win value from the gameboard to check whenever all ships
    // has been attacked and when it's a win, the game is stopped.
    if (win !== null) {
        winPopup.textContent = `${player.name} wins`;
        if (player.type === "computer") {
            winPopup.textContent = "You lose";
        }
        

        const playAgn = document.createElement('div');
        playAgn.textContent = "Play again";
        playAgn.classList.add("play");
        winPopup.appendChild(playAgn);

        const sinOrMul = document.createElement('div');

        sinOrMul.appendChild(button1);
        sinOrMul.appendChild(button2);
        winPopup.appendChild(sinOrMul);

        winPopup.classList.add('show');
        
        playerCont.appendChild(winPopup);
        playerBoardCont.style.pointerEvents = 'none';
        oppBoardCont.style.pointerEvents = 'none';
    }
}