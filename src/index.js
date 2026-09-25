import "./styles.css";
import { singlePlayer, resetGame } from "./screens/singlePlayer.js";
import { multiplayer } from "./screens/multiplayer.js";
import {
  title,
  buttonCont,
  button1,
  button2,
  playerCont,
  shipCont,
  playerBoardCont,
  oppBoardCont,
} from "./dom.js";

// Assemble initial DOM tree
buttonCont.append(button1, button2);
playerCont.append(shipCont, playerBoardCont, oppBoardCont);
document.body.append(title, buttonCont, playerCont);

button1.addEventListener("click", () => {
  resetGame(playerCont);
  singlePlayer(playerCont);
});

button2.addEventListener("click", () => {
  resetGame(playerCont);
  multiplayer(playerCont);
});
