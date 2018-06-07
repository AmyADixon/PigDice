var currentScore = 0;
var currentRolls = new Array();
var totalPlayer1Score = 0;
var totalPlayer2Score = 0;
var currentPlayer = 1;
var pointsToWin = 100;
window.onload = function () {
    document.getElementById("roll").onclick = roll;
    document.getElementById("pass").onclick = passTurn;
};
function roll() {
    let diceRoll = getRandomIntValue(1, 6);
    if (diceRoll == 1) {
        displayMessage("You rolled a 1; <br /> <strong> Next Player <strong>");
        currentRolls = [];
        passTurn();
    }
    else {
        displayMessage("You rolled a " + diceRoll + ".");
        currentRolls.push(diceRoll);
        currentScore += diceRoll;
        displayCurrentScore(currentScore);
    }
}
function passTurn() {
    let total = 0;
    for (let num in currentRolls) {
        total += currentRolls[num];
    }
    if (currentPlayer == 1) {
        totalPlayer1Score += total;
        displayPlayerScores(currentPlayer, totalPlayer1Score);
    }
    if (currentPlayer == 2) {
        totalPlayer2Score += total;
        displayPlayerScores(currentPlayer, totalPlayer2Score);
    }
    if (totalPlayer1Score >= 100 || totalPlayer2Score >= 100) {
        declareWinner();
    }
    currentRolls = [];
    currentScore = 0;
    displayCurrentScore(currentScore);
    if (document.getElementById("p" + currentPlayer + "Check").hasAttribute("hidden")) {
        document.getElementById("p" + currentPlayer + "Check").removeAttribute("hidden");
    }
    document.getElementById("p" + currentPlayer + "Check").setAttribute("hidden", "true");
    currentPlayer = (currentPlayer == 1) ? 2 : 1;
    document.getElementById("p" + currentPlayer + "Check").removeAttribute("hidden");
}
function getRandomIntValue(minValue, maxValue) {
    minValue = Math.floor(minValue);
    maxValue = Math.floor(maxValue);
    return Math.floor((Math.random() * (maxValue - minValue + 1) + minValue));
}
function displayMessage(msg) {
    let display = "<p>" + msg + "<p>";
    document.getElementById("output").innerHTML = display;
}
function displayCurrentScore(score) {
    document.getElementById("turnScore").value = score.toString();
}
function displayPlayerScores(player, score) {
    document.getElementById("player" + player + "Score").value = score.toString();
}
function declareWinner() {
    if (totalPlayer1Score >= 100) {
        displayPlayerScores(1, 100);
        displayPlayerScores(2, 0);
        displayCurrentScore(0);
        displayMessage("<strong> Player 1 wins! <strong>");
    }
    else {
        displayPlayerScores(2, 100);
        displayPlayerScores(1, 0);
        displayCurrentScore(0);
        displayMessage("<strong> Player 2 wins! <strong>");
    }
    document.getElementById("roll").setAttribute("disabled", "true");
    document.getElementById("pass").setAttribute("disabled", "true");
}
