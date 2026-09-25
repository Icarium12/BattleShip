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
    [x, y + 1],
  ];

  return neighbors.filter(
    ([nextX, nextY]) =>
      nextX >= 0 &&
      nextX < 10 &&
      nextY >= 0 &&
      nextY < 10 &&
      !gameboard.board[nextX][nextY].hit,
  );
}

export function chooseTarget(gameboard, gameState) {
  // Remove targets that have already been attacked
  gameState.compTargets = gameState.compTargets.filter(
    ([x, y]) => !gameboard.board[x][y].hit,
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

export function computerMove(gameboard, gameState) {
  if (gameState.activePlayer !== 2 || gameState.boardOwner !== 1) {
    return null;
  }

  const target = chooseTarget(gameboard, gameState);
  if (!target) return null;

  const [x, y] = target;
  const cell = gameboard.board[x][y];

  gameboard.receiveAttack(x, y);

  const result = {
    target,
    hit: cell.hasShip,
    sunk: cell.hasShip && cell.value.sunk,
    boundary: [],
  };

  if (result.sunk) {
    gameState.compTargets = [];
    result.boundary = cell.value.boundary;

    // Prevent the computer from targeting boundary cells.
    result.boundary.forEach(([boundaryX, boundaryY]) => {
      gameboard.board[boundaryX][boundaryY].hit = true;
    });
  } else if (result.hit) {
    gameState.compTargets.unshift(...getNeighbors(x, y, gameboard));
  } else {
    gameState.activePlayer = 1;
    gameState.boardOwner = 2;
  }

  result.won = gameboard.checkShipSunk();

  return result;
}
