const gameBoard = (() => {
   let Gameboard = {
      gameBoard: [],
   };

   return {
      gameBoard: Gameboard.gameBoard,
   };
})();

const Player = (sign) => {
   const playerSign = sign
   let isTurn;
   if (sign === "X") {
      isTurn = true;
   } else {
      isTurn = false;
   }

   function getIsTurn() {
      return isTurn;
   }

   function toggleTurn() {
      isTurn = isTurn ? false : true;
   }

   return {
      sign: playerSign,
      toggleTurn,
      getIsTurn,
   };
};

const renderGame = (() => {
   const player1 = Player("X");
   const player2 = Player("O");

   const gameBoardContainer = document.querySelector("#gameBoard");

   function renderGameBoard() {
      for (let i = 0; i < 9; i++) {
         const spot = document.createElement("div");
         spot.textContent = "";
         gameBoard.gameBoard.push(null);
         spot.setAttribute("data-spot", i);
         spot.classList.add("spot");
         spot.addEventListener("click", renderSign);
         gameBoardContainer.appendChild(spot);
      }
   }

   function renderSign(e) {
      let currentSpot = e.target;
      let currentSpotIndex = currentSpot.getAttribute("data-spot");

      if (gameBoard.gameBoard[currentSpotIndex] !== null) return;

      if (player1.getIsTurn()) {
         placeSign(currentSpot, currentSpotIndex, player1);
         currentSpot.classList.add("player1");
      } else {
         placeSign(currentSpot, currentSpotIndex, player2);
         currentSpot.classList.add("player2");
      }
   }

   function placeSign(currentSpot, currentSpotIndex, player) {
      currentSpot.textContent = player.sign;
      gameBoard.gameBoard[currentSpotIndex] = player.sign;
      player1.toggleTurn();
      player2.toggleTurn();
   }

   return {
      renderGameBoard,
   };
})();

renderGame.renderGameBoard();
