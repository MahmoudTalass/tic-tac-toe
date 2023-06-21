const gameBoard = (() => {
   let Gameboard = {
      gameBoard: [],
   };
})();

const renderGame = (() => {
   const gameBoardContainer = document.querySelector("#gameBoard");

   function renderGameBoard() {
      for (let i = 1; i <= 9; i++) {
         const spot = document.createElement("div");
         spot.textContent = i;
         spot.dataset.spot = i;
         spot.classList.add("spot");
         gameBoardContainer.appendChild(spot);
      }
   }

   return {
      renderGameBoard,
   };
})();

renderGame.renderGameBoard();
