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
      const square = document.createElement("div");
      const coordinates = [i, j];
      square.dataset.myArray = JSON.stringify(coordinates);
      square.classList.add("square");
      if (boardArray[i][j].hasShip === true) {
        square.dataset.shipId = boardArray[i][j].value.id;
        square.style.border = "2px solid blue";
        square.classList.add("square", "ship");
        if (boardArray[i][j].hit) {
          square.textContent = "X";
          square.classList.add("hit");
        }
      } else {
        square.style.border = "1px solid black";
        if (boardArray[i][j].hit) {
          square.textContent = "•";
          square.classList.add("miss");
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
      const square = document.createElement("div");
      const coordinates = [i, j];
      square.dataset.myArray = JSON.stringify(coordinates);
      square.className = "square";
      square.style.border = "1px solid black";

      boardCont.append(square);
      if (boardArray[i][j].hasShip) {
        if (boardArray[i][j].hit) {
          square.textContent = "X";
          square.classList.add("hit");
        }
      } else {
        if (boardArray[i][j].hit) {
          square.textContent = "•";
          square.classList.add("miss");
        }
      }
    }
  }
}

export function renderShips(gameboard, cont, boardCont) {
  const random = document.createElement("button");

  random.textContent = "Randomize Placement";
  random.addEventListener("click", () => {
    gameboard.placeShipRandom();
    renderBoard(gameboard, boardCont);
  });
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
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      const coordString = square.dataset.myArray;
      const coord = JSON.parse(coordString);
      const x = coord[0];
      const y = coord[1];
      const direction = shipDirection.value;
      const validPlacement = gameboard.placeShip(ship, x, y, direction);

      if (validPlacement === "Invalid position") {
        alert(validPlacement);
      } else {
        renderBoard(gameboard, boardCont);
        renderBoard(gameboard, playerBoardCont);
      }
    });
  });
}

export function createBoardContainer() {
  const board = document.createElement("div");
  board.className = "gameboard";
  return board;
}
