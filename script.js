const gameBoard = (() => {
   let Gameboard = {
      gameBoard: [],
   };

   return {
      gameBoard: Gameboard.gameBoard,
   };
})();

const Player = (sign) => { 
   return {
      sign,
   };
};

const renderGame = (() => {
   const player1 = Player("X");
   const player2 = Player("O");

   let player1Turn = true;
   let player2Turn = false;

   const gameBoardContainer = document.querySelector("#gameBoard");

   function renderGameBoard() {
      for (let i = 0; i < 9; i++) {
         const spot = document.createElement("div");
         spot.textContent = "";
         gameBoard.gameBoard.push(null);
         spot.setAttribute("data-spot", i)
         spot.classList.add("spot");
         spot.addEventListener("click", renderSign);
         gameBoardContainer.appendChild(spot);
      }
   }

   function renderSign(e) {
      let currentSpot = e.target;
      let currentSpotIndex = currentSpot.getAttribute("data-spot")
      console.log(gameBoard.gameBoard)
      if (gameBoard.gameBoard[currentSpotIndex] !== null) return;

      if (player1Turn) {
         currentSpot.textContent = player1.sign;
         gameBoard.gameBoard[currentSpotIndex] = player1.sign;
         currentSpot.classList.add("player1")
         player1Turn = false;
         player2Turn = true;
      } else {
         currentSpot.textContent = player2.sign;
         gameBoard.gameBoard[currentSpotIndex] = player2.sign;
         currentSpot.classList.add("player2");
         player2Turn = false;
         player1Turn = true;
      }
   }

   return {
      renderGameBoard,
   };
})();



renderGame.renderGameBoard();
