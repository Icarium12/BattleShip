export const title = document.createElement("div");
title.className = "game-title";
title.textContent = "BattleShip Game";

export const buttonCont = document.createElement("div");
buttonCont.className = "button-cont";

export const button1 = document.createElement("button");
button1.textContent = "Single Player";

export const button2 = document.createElement("button");
button2.textContent = "Multiplayer";

export const playerCont = document.createElement("div");
playerCont.className = "player-cont";

export const shipCont = document.createElement("div");
shipCont.className = "ships";

export const playerBoardCont = document.createElement("div");

export const oppBoardCont = document.createElement("div");

export const winPopup = document.createElement("div");
winPopup.textContent = "You win";
winPopup.className = "popup-overlay";
