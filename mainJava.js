var Game = (function () {
    function Game(numPointsToWin) {
        this.pointsToWin = numPointsToWin;
        this.gameTotalPlayer1 = 0;
        this.gameTotalPlayer2 = 0;
        this.currentTurnTotal = 0;
        this.currentPlayer = 1;
    }
    Game.prototype.getGameTotal = function (playerNum) {
        if (playerNum == 1) {
            return this.gameTotalPlayer1;
        }
        else if (playerNum == 2) {
            return this.gameTotalPlayer2;
        }
        else {
            return null;
        }
    };
    Game.prototype.rollDie = function () {
        var roll = getRandomIntValue(1, 6);
        if (roll == 1) {
            this.passTurn();
        }
        else {
            this.currentTurnTotal += roll;
        }
        if (this.currentPlayer == 1) {
            if (this.currentTurnTotal + this.gameTotalPlayer1 >= this.pointsToWin) {
                this.gameState = "finished";
            }
        }
        return roll;
    };
    Game.prototype.passTurn = function () {
        this.currentTurnTotal = 0;
        this.currentPlayer = (this.currentPlayer = 1) ? 2 : 1;
    };
    return Game;
}());
function getRandomIntValue(minValue, maxValue) {
    return Math.floor((Math.random() * 10 + 1));
}
var pigGame = new Game(25);
window.onload = function () {
    document.getElementById("roll").onclick = roll;
    document.getElementById("pass").onclick = passTurn;
};
function roll() {
    alert("Roll was clicked");
}
function passTurn() {
    alert("Pass was clicked");
}
