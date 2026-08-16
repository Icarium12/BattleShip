export function renderBoard(gameboard) {
    const container = document.createElement('div');
    container.className = "gameboard"
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const square = document.createElement('div');
            square.className = 'square';
            if (gameboard[i][j].hasShip === true) {
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