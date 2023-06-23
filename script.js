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

const Player = (name, sign) => {
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
      name,
   };
};

const endGame = (() => {
   function displayRestartBtn() {
      const restartBtn = document.querySelector("#restart-btn");
      restartBtn.style.display = "block";
   }

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
         displayRestartBtn();
         return winner[0];
      } else {
         return false;
      }
   }

   function tie() {
      let spotsLeft = 0;
      gameBoard.gameBoard.forEach((spot) => {
         if (spot === null) {
            spotsLeft++;
         }
      });

      if (spotsLeft === 0) {
         displayRestartBtn();
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
   const gameBoardContainer = document.querySelector("#gameBoard");

   const matchResult = document.querySelector("#match-result");

   const player1NameDisplay = document.querySelector("#player1-name-display");
   const player2NameDisplay = document.querySelector("#player2-name-display");

   const restartBtn = document.querySelector("#restart-btn");

   restartBtn.addEventListener("click", restartGame);

   let player1;
   let player2;

   function retrievePlayers(player1Name, player2Name) {
      player1 = Player(player1Name, "X");
      player2 = Player(player2Name, "O");
   }

   function clearGameboardArr() {
      for(let i = 0; i < 9; i++) {
         gameBoard.gameBoard[i] = null;
      }
   }

   function restartGame() {
      const gameGridContainer = document.querySelector("#game-grid-container");
      gameBoardContainer.removeChild(gameGridContainer);
      clearGameboardArr()
      renderGameBoard();
      matchResult.textContent = ""
   }

   function populateGameBoardArr() {
      gameBoard.gameBoard.push(null);
   }

   function renderGameBoard() {
      const gameGridContainer = document.createElement("div");
      gameGridContainer.classList.add("game-grid-container");
      gameGridContainer.id = "game-grid-container";
      gameBoardContainer.appendChild(gameGridContainer);

      for (let i = 0; i < 9; i++) {
         const spot = document.createElement("div");
         spot.textContent = "";
         populateGameBoardArr();
         spot.setAttribute("data-spot", i);
         spot.classList.add("spot");
         spot.addEventListener("click", renderSign);
         gameGridContainer.appendChild(spot);
      }
      player1NameDisplay.textContent = `${player1.name} (${player1.sign})`;
      player2NameDisplay.textContent = `${player2.name} (${player2.sign})`;
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
      currentSpot.style.fontSize = "1.8rem";
      gameBoard.gameBoard[currentSpotIndex] = player.sign;
      player1.toggleTurn();
      player2.toggleTurn();
      const isGameOver = endGame.isGameOver();
      if (isGameOver !== false) {
         announceWinner(isGameOver);
      }
      const tie = endGame.tie();
      if (tie) {
         matchResult.textContent = "Tie";
      }
   }

   function announceWinner(isGameOver) {
      if (isGameOver.patternWon) {
         const signsOnBoard = document.getElementsByClassName("spot");
         const signsOnBoardArr = [...signsOnBoard];

         signsOnBoardArr.forEach((spot) => {
            const spotIndex = parseInt(spot.getAttribute("data-spot"));
            const match1 = spotIndex === isGameOver.winningIndices[0];
            const match2 = spotIndex === isGameOver.winningIndices[1];
            const match3 = spotIndex === isGameOver.winningIndices[2];
            spot.removeEventListener("click", renderSign);

            if (match1 || match2 || match3) {
               spot.classList.add("won")
               spot.style.fontWeight = "700"
            }
         });
         const nameOfWinner =
            player1.sign === isGameOver.winningSign
               ? player1.name
               : player2.name;

         matchResult.textContent = `${nameOfWinner} Wins!`;
      }
   }

   return {
      renderGameBoard,
      retrievePlayers,
      player1,
      player2,
   };
})();

const initializeGame = (() => {
   const gameContainer = document.querySelector("#game-container");
   const playerNameForm = document.querySelector("#player-names-form");
   const playerNameInput = document.querySelectorAll(".player-name-input");

   const userNamePattern = /^(\w{1,12})$/;

   function validateName(inputField) {
      if (userNamePattern.test(inputField.value)) {
         inputField.classList.remove("invalid");
      } else {
         inputField.classList.add("invalid");
      }
   }

   playerNameInput.forEach((input) => {
      input.addEventListener("keyup", (e) => {
         validateName(e.target);
      });
   });

   function startGame() {
      const player1Name = document.querySelector("#player1").value;
      const player2Name = document.querySelector("#player2").value;
      renderGame.retrievePlayers(player1Name, player2Name);
      renderGame.renderGameBoard();
      gameContainer.style.display = "flex";
      playerNameForm.style.display = "none";
   }

   playerNameForm.addEventListener("submit", (e) => {
      e.preventDefault();
      startGame();
   });
})();
