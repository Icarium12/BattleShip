import { hit, checkWin } from "../ui/interactions";

export function getAvailableTargets(gameboard, gameState) {
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

export function getNeighbors(x, y, gameboard) {
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

export function chooseTarget(gameboard, gameState) {
    // Remove targets that have already been attacked 
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

export function computerMove (gameboard, 
                        boardCont, 
                        oppBoardCont, 
                        gameState,
                        player) {
    
    // The computer uses a queue of priority targets. When a ship is hit adjacent cells are 
    // added to the queue; when no active target remains it falls back to random hunt targeting
    // unhit cells 
    
    if(gameState.activePlayer !== 2 || gameState.boardOwner !== 1) return;

    oppBoardCont.style.boxShadow = "none";
    boardCont.style.boxShadow = "none";
    const activeShadow =
        "0 0 0 4px rgba(217, 93, 93, 0.85), 0 8px 18px rgba(18, 59, 93, 0.18)";
    
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
        square.classList.add("hit");

        if (cell.value.sunk) {
            gameState.compTargets = [];
            cell.value.boundary.forEach(([x, y]) => {
                //Mark cells around a sunk ship as unavailable targets 
                gameboard.board[x][y].hit = true;
                const boundarySquare = [...oppBoardCont.children].find(square => {
                    const [squareX, squareY] = JSON.parse(square.dataset.myArray);
                    return squareX === x && squareY === y;
                })

                if (boundarySquare) {
                    boundarySquare.textContent = "•";
                    boundarySquare.classList.add("miss");
                }
            });

        } 
        else {
            //After a hit prioritize adjacent cells to locate the rest of the ship
            gameState.compTargets.unshift(...getNeighbors(x, y, gameboard));
        }

        setTimeout(() => {
            computerMove(gameboard, boardCont, oppBoardCont, gameState, player);
        }, 1000);

        return;
    }

    square.textContent = "•"
    square.classList.add("miss");

    boardCont.style.boxShadow = activeShadow;
    oppBoardCont.style.boxShadow = "none";

    gameState.activePlayer = 1;
    gameState.boardOwner = 2;

    let win = gameboard.checkShipSunk();
    checkWin(win, player);
     
}