const winningPattern = (patternWon, winningSign, winningIndices) => {
   return {
      patternWon,
      winningSign,
      winningIndices,
   };
};

const gameBoard = (() => {
   let Gameboard = {
      gameBoard: [],
   };

   return {
      gameBoard: Gameboard.gameBoard,
   };
})();

const Player = (sign) => {
   const playerSign = sign;
   let isTurn = { value: null };

   if (sign === "X") {
      isTurn.value = true;
   } else {
      isTurn.value = false;
   }

   function toggleTurn() {
      isTurn.value = !isTurn.value;
   }

   return {
      sign: playerSign,
      toggleTurn,
      isTurn,
   };
};

const endGame = (() => {
   function isGameOver() {
      const winPattern1 = winningPattern(
         gameBoard.gameBoard[0] === gameBoard.gameBoard[1] &&
            gameBoard.gameBoard[0] === gameBoard.gameBoard[2] &&
            gameBoard.gameBoard[0] !== null,
         gameBoard.gameBoard[0],
         [0, 1, 2]
      );

      const winPattern2 = winningPattern(
         gameBoard.gameBoard[0] === gameBoard.gameBoard[3] &&
            gameBoard.gameBoard[0] === gameBoard.gameBoard[6] &&
            gameBoard.gameBoard[0] !== null,
         gameBoard.gameBoard[0],
         [0, 3, 6]
      );

      const winPattern3 = winningPattern(
         gameBoard.gameBoard[2] === gameBoard.gameBoard[5] &&
            gameBoard.gameBoard[2] === gameBoard.gameBoard[8] &&
            gameBoard.gameBoard[2] !== null,
         gameBoard.gameBoard[2],
         [2, 5, 8]
      );

      const winPattern4 = winningPattern(
         gameBoard.gameBoard[6] === gameBoard.gameBoard[7] &&
            gameBoard.gameBoard[6] === gameBoard.gameBoard[8] &&
            gameBoard.gameBoard[6] !== null,
         gameBoard.gameBoard[6],
         [6, 7, 8]
      );

      const winPattern5 = winningPattern(
         gameBoard.gameBoard[3] === gameBoard.gameBoard[4] &&
            gameBoard.gameBoard[3] === gameBoard.gameBoard[5] &&
            gameBoard.gameBoard[3] !== null,
         gameBoard.gameBoard[3],
         [3, 4, 5]
      );

      const winPattern6 = winningPattern(
         gameBoard.gameBoard[1] === gameBoard.gameBoard[4] &&
            gameBoard.gameBoard[1] === gameBoard.gameBoard[7] &&
            gameBoard.gameBoard[1] !== null,
         gameBoard.gameBoard[1],
         [1, 4, 7]
      );

      const winPattern7 = winningPattern(
         gameBoard.gameBoard[0] === gameBoard.gameBoard[4] &&
            gameBoard.gameBoard[0] === gameBoard.gameBoard[8] &&
            gameBoard.gameBoard[0] !== null,
         gameBoard.gameBoard[0],
         [0, 4, 8]
      );

      const winPattern8 = winningPattern(
         gameBoard.gameBoard[2] === gameBoard.gameBoard[4] &&
            gameBoard.gameBoard[2] === gameBoard.gameBoard[6] &&
            gameBoard.gameBoard[2] !== null,
         gameBoard.gameBoard[2],
         [2, 4, 6]
      );

      const winningPatterns = [
         winPattern1,
         winPattern2,
         winPattern3,
         winPattern4,
         winPattern5,
         winPattern6,
         winPattern7,
         winPattern8,
      ];

      let winner = winningPatterns.filter((pattern) => pattern.patternWon);

      if (winner.length !== 0) {
         return winner[0];
      } else {
         return false;
      }
   }

   function tie() {
      let spotsLeft = 0;
      gameBoard.gameBoard.forEach(spot => {
         if (spot === null) {
            spotsLeft++;
         }
      })

      if (spotsLeft === 0) {
         return true;
      } else {
         return false;
      }
   }

   return {
      isGameOver,
      tie,
   };
})();

const renderGame = (() => {
   const player1 = Player("X");
   const player2 = Player("O");

   const gameBoardContainer = document.querySelector("#gameBoard");

   const matchResult = document.querySelector("#match-result");

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

      if (player1.isTurn.value) {
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
      const isGameOver = endGame.isGameOver();
      if (isGameOver !== false) {
         announceWinner(isGameOver);
      }
      const tie = endGame.tie();
      if (tie) {
         matchResult.textContent = "Tie"
      }
   }

   function announceWinner(isGameOver) {
      if (isGameOver.patternWon) {
         const signsOnBoard = document.getElementsByClassName("spot");
         const signsOnBoardArr = [...signsOnBoard];

         const winningSpots = signsOnBoardArr.filter((spot) => {
            const spotIndex = parseInt(spot.getAttribute("data-spot"));
            const match1 = spotIndex === isGameOver.winningIndices[0];
            const match2 = spotIndex === isGameOver.winningIndices[1];
            const match3 = spotIndex === isGameOver.winningIndices[2];
            spot.removeEventListener('click', renderSign)

            if (match1 || match2 || match3) {
               console.log(spot);
               spot.classList.add("won");
               return spot;
            }
         });

         matchResult.textContent = `${isGameOver.winningSign} Wins!`
      }
   }

   return {
      renderGameBoard,
   };
})();

renderGame.renderGameBoard();
