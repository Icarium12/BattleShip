import {
  renderBoard,
  renderOppBoard,
  createBoardContainer,
  renderShips,
} from "../ui/renderBoard";
import { Player } from "../player";
import {
  setTarget,
  fire,
  waitForClick,
  dragAndDrop,
  checkWin,
} from "../ui/interactions";
import { button1, button2, playerBoardCont, shipCont } from "../dom.js";
import targetImg from "../target.jpg";

function startGame(container, player1, player2) {
  const gameState = {
    activePlayer: 1,
    boardOwner: 2,
  };

  const player1Cont = document.createElement("div");
  player1Cont.classList.add("player-cont");
  // player1Cont.classList.add("player-panel");

  const player2Cont = document.createElement("div");
  player2Cont.classList.add("player-cont");
  // player2Cont.classList.add("player-panel");
  player2Cont.classList.add("hide");

  container.appendChild(player1Cont);
  container.appendChild(player2Cont);

  const p1Board = document.createElement("div");
  p1Board.classList.add("gameboard");
  p1Board.classList.add("dim");
  renderBoard(player1.playerBoard, p1Board);

  const opp1Board = document.createElement("div");
  opp1Board.classList.add("gameboard");
  player1Cont.appendChild(opp1Board);
  renderOppBoard(player2.playerBoard, opp1Board);

  const p2Board = document.createElement("div");
  p2Board.classList.add("gameboard");
  player2Cont.appendChild(p2Board);
  renderBoard(player2.playerBoard, p2Board);

  const opp2Board = document.createElement("div");
  opp2Board.classList.add("gameboard");
  player2Cont.appendChild(opp2Board);
  renderOppBoard(player1.playerBoard, opp2Board);

  const switchScreen = document.createElement("div");
  switchScreen.classList.add("switch");
  switchScreen.classList.add("hide");

  const switchText = document.createElement("div");
  switchText.classList.add("switch-title");
  switchScreen.appendChild(switchText);
  const switchButton = document.createElement("button");
  switchButton.textContent = "Ready";
  switchButton.addEventListener("click", () => {
    if (gameState.activePlayer === 1) {
      switchScreen.classList.add("hide");
      player1Cont.classList.remove("hide");
    } else if (gameState.activePlayer === 2) {
      switchScreen.classList.add("hide");
      player2Cont.classList.remove("hide");
    }
  });
  switchScreen.appendChild(switchButton);
  container.appendChild(switchScreen);

  const image = document.createElement("img");
  image.src = targetImg;

  const playerArea = document.createElement("div");
  playerArea.className = "player-area";

  const myTitle = document.createElement("div");
  myTitle.className = "player-board-name";
  myTitle.textContent = `${player1.name} board`;

  const opponentArea = document.createElement("div");
  opponentArea.className = "opponent-area";

  const oppTitle = document.createElement("div");
  oppTitle.className = "opp-name";
  oppTitle.textContent = `${player2.name} board`;

  const fireBtn = document.createElement("button");
  fireBtn.classList.add("fire");
  fireBtn.textContent = "fire";
  fireBtn.disabled = true;

  let selectedSquare1 = null;

  fireBtn.addEventListener("click", () => {
    fire(
      selectedSquare1,
      gameState,
      player2,
      1,
      2,
      player1Cont,
      opp1Board,
      switchText,
      switchScreen,
      p2Board,
    );

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

  const opp1Squares = opp1Board.querySelectorAll(".square");
  opp1Squares.forEach((square) => {
    square.addEventListener("click", () => {
      selectedSquare1 = setTarget(square, image, fireBtn, player2);
    });
  });

  let selectedSquare2 = null;

  const player2Area = document.createElement("div");
  player2Area.className = "player-area";

  const myTitle2 = document.createElement("div");
  myTitle2.className = "player-board-name";
  myTitle2.textContent = `${player2.name} board`;

  const opponentArea2 = document.createElement("div");
  opponentArea2.className = "opponent-area";

  const oppTitle2 = document.createElement("div");
  oppTitle2.className = "opp-name";
  oppTitle2.textContent = `${player1.name} board`;

  const fireBtn2 = fireBtn.cloneNode(true);
  fireBtn2.addEventListener("click", () => {
    fire(
      selectedSquare2,
      gameState,
      player1,
      2,
      1,
      player2Cont,
      opp2Board,
      switchText,
      switchScreen,
      p1Board,
    );

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

  const opp2Squares = opp2Board.querySelectorAll(".square");
  opp2Squares.forEach((square) => {
    square.addEventListener("click", () => {
      selectedSquare2 = setTarget(square, image, fireBtn2, player1);
    });
  });
}

export function multiplayer(container) {
  const dialog = document.createElement("dialog");
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
  document.body.appendChild(dialog);

  const form = document.createElement("form");
  form.className = "playerForm";

  const player1Label = document.createElement("label");
  player1Label.textContent = "Player1 Name:";
  form.appendChild(player1Label);

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.required = true;
  input1.addEventListener("change", () => {
    if (input1.value.trim() === "") {
      input1.setCustomValidity("Field cannot be empty");
      input1.reportValidity();
    } else {
      input1.setCustomValidity("");
    }
  });
  form.appendChild(input1);

  const player2Label = document.createElement("label");
  player2Label.textContent = "Player2 Name:";
  form.appendChild(player2Label);

  const input2 = document.createElement("input");
  input2.type = "text";
  input2.required = true;
  input2.addEventListener("change", () => {
    if (input2.value.trim() === "") {
      input2.setCustomValidity("Field cannot be empty");
      input2.reportValidity();
    } else {
      input2.setCustomValidity("");
    }
  });
  form.appendChild(input2);

  const submit = document.createElement("button");
  submit.textContent = "Submit";
  submit.addEventListener("click", (e) => {
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

        const title = document.createElement("div");
        title.className = "switch-title";
        title.textContent = `${player1.name} press ready to place your shuips`;

        const switchScreen = document.createElement("div");
        switchScreen.className = "switch";

        const confirm = document.createElement("button");
        confirm.textContent = "Ready";

        switchScreen.appendChild(title);
        switchScreen.appendChild(confirm);

        container.appendChild(switchScreen);

        await waitForClick(confirm);

        container.replaceChildren();

        const board1 = createBoardContainer();

        player1.playerBoard.placeShipDefault();
        renderBoard(player1.playerBoard.board, board1);
        renderShips(player1.playerBoard, shipCont, board1);
        dragAndDrop(player1.playerBoard, board1);
        container.appendChild(shipCont);
        container.appendChild(board1);

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
        playerBoardCont.parentNode.replaceChild(
          player2BoardCont,
          playerBoardCont,
        );

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
    } else {
      form.reportValidity();
    }
  });
  form.appendChild(submit);

  const close = document.createElement("button");
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
