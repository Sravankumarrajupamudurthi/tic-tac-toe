let currentPlayer = "X";
let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("status");

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (cell.innerText !== "") return;

    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? "x" : "o");

    if (checkWin()) {
      statusText.innerText = `Player ${currentPlayer} Wins! 🎉`;
      disableBoard();
      return;
    }

    if (checkDraw()) {
      statusText.innerText = "It's a Draw 😐";
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer} Turn`;
  });
});

function checkWin() {
  return winPatterns.some(pattern =>
    pattern.every(index =>
      cells[index].innerText === currentPlayer
    )
  );
}

function checkDraw() {
  return [...cells].every(cell => cell.innerText !== "");
}

function disableBoard() {
  cells.forEach(cell => cell.disabled = true);
}

function resetGame() {
  currentPlayer = "X";
  statusText.innerText = "Player X Turn";
  cells.forEach(cell => {
    cell.innerText = "";
    cell.disabled = false;
    cell.classList.remove("x", "o");
  });
}
