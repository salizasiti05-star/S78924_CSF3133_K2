let playerName = "";
let roundCount = 0;
let wins = 0;
let losses = 0;
let draws = 0;
let gameStartTime = "";

const choices = ["rock", "paper", "scissors"];
const images = {
  rock: "rock.png",
  paper: "paper.png",
  scissors: "scissors.png"
};

function startGame() {
  const input = document.getElementById("playerName").value.trim();
  playerName = input !== "" ? input : "Player";

  document.getElementById("welcomeMsg").textContent = `Welcome, ${playerName}! Choose Rock, Paper, or Scissors.`;

  if (!gameStartTime) {
    gameStartTime = new Date().toLocaleTimeString();
    document.getElementById("startTime").textContent = `Game started at: ${gameStartTime}`;
  }
}

function playRound(playerChoice) {
  if (!playerName) {
    startGame();
  }

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  roundCount++;

  // Kemas kini gambar pilihan
  const playerImg = document.getElementById("playerImg");
  const computerImg = document.getElementById("computerImg");
  playerImg.src = images[playerChoice];
  playerImg.alt = playerChoice;
  computerImg.src = images[computerChoice];
  computerImg.alt = computerChoice;

  // Tentukan keputusan dan warna
  let outcome = "";
  let color = "grey";

  if (playerChoice === computerChoice) {
    outcome = "Draw";
    draws++;
    color = "grey";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    outcome = "Win";
    wins++;
    color = "green";
  } else {
    outcome = "Lose";
    losses++;
    color = "red";
  }

  // Kemas kini teks keputusan & warna
  const resultEl = document.getElementById("result");
  resultEl.textContent = `Round ${roundCount}: ${outcome}!`;
  resultEl.style.color = color;
  resultEl.style.fontWeight = "bold";

  // Kemas kini papan skor
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("draws").textContent = draws;

  // Tambah baris ke jadual Match History
  const tbody = document.getElementById("historyBody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${roundCount}</td>
    <td>${capitalize(playerChoice)}</td>
    <td>${capitalize(computerChoice)}</td>
    <td style="color: ${color}; font-weight: bold;">${outcome}</td>
  `;
  tbody.appendChild(row);
}

function showSummary() {
  const summaryEl = document.getElementById("summaryText");
  summaryEl.textContent = `${playerName} played ${roundCount} round(s) — Wins: ${wins}, Losses: ${losses}, Draws: ${draws}.`;
}

function resetGame() {
  roundCount = 0;
  wins = 0;
  losses = 0;
  draws = 0;

  document.getElementById("wins").textContent = 0;
  document.getElementById("losses").textContent = 0;
  document.getElementById("draws").textContent = 0;
  document.getElementById("result").textContent = "";
  document.getElementById("summaryText").textContent = "";
  document.getElementById("historyBody").innerHTML = "";
  document.getElementById("playerImg").src = "rock.png";
  document.getElementById("computerImg").src = "rock.png";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}