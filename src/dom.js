import { Player } from "./player";

export function renderBoard(gameboard) {
    const container = document.createElement('div');
    container.className = "gameboard";
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
            square.className = 'square';
            if (boardArray[i][j].hasShip === true) {
                square.style.border = "2px solid red";
            }
            else {
                square.style.border = "1px solid black";
            }
            container.append(square);
        }
    }
    document.body.append(container);
}

export function createPlayer(container) {
    // const container = document.createElement('div');
    // container.className = "create-player";
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
    button.textContent = "Submit";
    button.type = "button";
    button.addEventListener('click', () => {
        dialog.close();
        const player = new Player(playerType.value, input.value);
        player.playerBoard.createBoard();
        renderBoard(player.playerBoard);

    });
    form.appendChild(button);
    dialog.appendChild(form);
    document.body.append(dialog);
    dialog.showModal();
}