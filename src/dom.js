import { Player } from "./player";
import { playerCont, playerBoardCont, oppBoardCont, winPopup } from ".";

export function renderBoard(gameboard, container, boardCont) {
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
            if (boardArray[i][j].hasShip === true) {
                square.style.border = "2px solid blue";
            }
            else {
                square.style.border = "1px solid black";
            }

            // if (boardArray[i][j].hit === true && boardArray[i][j].hasShip === true) {
            //     square.textContent = "X";
            // }

            // else if (boardArray[i][j].hit === true && boardArray[i][j].hasShip === true) {
            //     square.textContent = ".";
            // }
            // square.addEventListener('click', () => {
            //     gameboard.receiveAttack(i, j);
            // });
            boardCont.append(square);
        }
    }
    // container.append(boardCont);
    // document.body.append(container);
}

export function renderOppBoard(gameboard, container, boardCont) {
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
            // if (boardArray[i][j].hit === true && boardArray[i][j].hasShip === true) {
            //     square.textContent = "X";
            // }

            // else if (boardArray[i][j].hit === true && boardArray[i][j].hasShip === true) {
            //     square.textContent = ".";
            // }
            boardCont.append(square);
        }
        
    } 
    // container.append(boardCont);
}

function hit(x, y, gameboard) {
    gameboard.receiveAttack(x, y);
}

function computerMove (gameboard, boardCont, oppBoardCont, gameState) {
    if (gameState.activePlayer === 2 && gameState.boardOwner === 1) {
        let boardArray;
        if (gameboard && gameboard.board) {
            boardArray = gameboard.board;
        } else {
            boardArray = gameboard;
        }

        const squares = oppBoardCont.childNodes;
        let coord;
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        
        squares.forEach(square => {
            const coordString = square.dataset.myArray;
            coord = JSON.parse(coordString);
            const x2 = coord[0];
            const y2 = coord[1];
            if (x === x2 && y === y2) {
                if (boardArray[x][y].hit === true) {
                    computerMove(gameboard, boardCont, oppBoardCont);
                }
                else if (boardArray[x][y].hasShip === true && boardArray[x][y].hit === false) { 
                    hit(x, y, gameboard);
                    square.textContent = "X";
                    setTimeout(() => {
                        computerMove(gameboard, boardCont, oppBoardCont, gameState);
                    }, 3000);
                    
                }
                else if (boardArray[x][y].hasShip === false && boardArray[x][y].hit === false) {
                    hit(x, y, gameboard);
                    square.textContent = ".";
                    oppBoardCont.style.backgroundColor = "#f5f5f5";
                    boardCont.style.backgroundColor = "#ffffff";
                    gameState.activePlayer = 1;
                    gameState.boardOwner = 2;
                    return;
                }
            }
        })
    }
     
}

export function createPlayer(container) {

    const dialog = document.createElement('dialog');
    const form = document.createElement('form');
    form.className = "playerForm";
    const playerLabel = document.createElement('label');
    playerLabel.textContent = "Player Name:";
    form.appendChild(playerLabel);

    const input = document.createElement('input');
    input.type = 'text';
    form.appendChild(input);

    const typeLabel = document.createElement('label');
    typeLabel.textContent = "Player Type:";
    form.appendChild(typeLabel);

    const playerType = document.createElement('select');
    playerType.name = "type";
    const option1 = document.createElement('option');
    option1.value = "user";
    option1.textContent = "user";
    playerType.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = "computer";
    option2.textContent = "computer";
    playerType.appendChild(option2);

    form.appendChild(playerType);

    const button = document.createElement('button');
    button.textContent = "Start";
    button.type = "button";
    button.addEventListener('click', () => {
        dialog.close();


        const player = new Player(playerType.value, input.value);
        player.playerBoard.createBoard();
        player.playerBoard.placeShipDefault();
        renderBoard(player.playerBoard, playerCont, playerBoardCont);

        // Receiving attack
        const gameState = {
            activePlayer: 1,
            boardOwner: 2,
        }
        playerBoardCont.style.backgroundColor =  "#f5f5f5";
        const squares = playerBoardCont.childNodes;
        squares.forEach(square => {
            square.addEventListener('click', () => {
                if (gameState.activePlayer === 2 && gameState.boardOwner === 1) {
                    gameState.activePlayer = 1;
                    gameState.boardOwner = 2;
                    const coordString = square.dataset.myArray;
                    const coord = JSON.parse(coordString);
                    hit(coord[0], coord[1], player.playerBoard);
                    if (player.playerBoard.board[coord[0]][coord[1]].hit === true && player.playerBoard.board[coord[0]][coord[1]].hasShip === true) {
                        square.textContent = "X";
                        gameState.activePlayer = 2;
                        gameState.boardOwner = 1;
                        return;
                    }
                    else if(player.playerBoard.board[coord[0]][coord[1]].hit === true && player.playerBoard.board[coord[0]][coord[1]].hasShip === false) {
                        square.textContent = ".";
                    }
                    playerBoardCont.style.backgroundColor =  "#f5f5f5";
                    oppBoardCont.style.backgroundColor = "#ffffff"; 
                }
                // renderBoard(player.playerBoard, playerCont, playerBoardCont);
            })
            
        })
        
        
        const computer = new Player('computer', 'computer');
        computer.playerBoard.createBoard();
        computer.playerBoard.placeShipDefault();
        renderOppBoard(computer.playerBoard, playerCont, oppBoardCont);
        
        

        const oppSquares = oppBoardCont.childNodes;
        oppSquares.forEach(square => {
            square.addEventListener('click', () => {
                if (gameState.activePlayer === 1 && gameState.boardOwner === 2) {
                    gameState.activePlayer = 2;
                    gameState.boardOwner = 1;
                    const coordString = square.dataset.myArray;
                    const coord = JSON.parse(coordString);
                    hit(coord[0], coord[1], computer.playerBoard);
                    if(computer.playerBoard.board[coord[0]][coord[1]].hit === true && computer.playerBoard.board[coord[0]][coord[1]].hasShip === true) {
                        console.log(computer.playerBoard.board[coord[0]][coord[1]].value);
                        gameState.activePlayer = 1;
                        gameState.boardOwner = 2;
                        square.textContent = "X";
                        square.style.border = "2px solid red";
                        return;
                    }
                    else if(computer.playerBoard.board[coord[0]][coord[1]].hit === true && computer.playerBoard.board[coord[0]][coord[1]].hasShip === false) {
                        // activePlayer = 2;
                        // boardOwner = 1;
                        square.textContent = ".";
                        oppBoardCont.style.backgroundColor = "#f5f5f5";
                        playerBoardCont.style.backgroundColor = "#ffffff";
                    }  
                }
                setTimeout(() => {
                    computerMove(player.playerBoard, oppBoardCont, playerBoardCont, gameState);
                }, 2000);
                
                // computerMove(player.playerBoard, square, playerBoardCont);
            }, { once: true});
        });

        oppBoardCont.addEventListener('click', () => {
            let win = computer.playerBoard.checkShipSunk();
                if (win !== null) {
                    winPopup.classList.add('show');
                    oppBoardCont.appendChild(winPopup);
                    oppBoardCont.style.pointerEvents = 'none';
                }
        })
    });
    form.appendChild(button);
    dialog.appendChild(form);
    document.body.append(dialog);
    dialog.showModal();
}