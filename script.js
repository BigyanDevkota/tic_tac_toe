document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.getElementById("restart-btn");
  const resultDiv = document.getElementById("result");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === "X" ? "#e96443" : "#904e95";

    if (checkWin()) {
      resultDiv.textContent = `${currentPlayer} Wins!`;
      gameActive = false;
      return;
    }

    if (checkDraw()) {
      resultDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function checkWin() {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return gameState[index] === currentPlayer;
      });
    });
  }

  function checkDraw() {
    return gameState.every((cell) => cell !== "");
  }

  function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    resultDiv.textContent = "";
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.style.color = "#000";
    });
  }

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  restartButton.addEventListener("click", restartGame);
});
