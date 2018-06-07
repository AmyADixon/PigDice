var currentScore:number = 0; // To display only
var currentRolls = new Array<number>(); // Keeps track of all turn rolls, not 1
var totalPlayer1Score:number = 0; // Keeps track of Player 1 total
var totalPlayer2Score:number = 0; // Keeps track of Player 2 total
var currentPlayer:number = 1; // Switches players
var pointsToWin = 100; 

window.onload = function() {
    document.getElementById("roll").onclick = roll;
    document.getElementById("pass").onclick = passTurn;
}

/**
 * When the user clicks the roll button
 */
function roll() {
    let diceRoll:number = getRandomIntValue(1, 6);

    //(<HTMLOutputElement> document.getElementById("diceValue")).value = String(diceRoll); // Not in IE/edge

    if(diceRoll == 1) {
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

/**
 * When t he user clicks the pass button
 */
function passTurn() {
    let total = 0;

    for(let num in currentRolls) {
        total += currentRolls[num];
    }


    if (currentPlayer == 1) {
        totalPlayer1Score += total;
        displayPlayerScores(currentPlayer, totalPlayer1Score);
    }
    if(currentPlayer == 2) {
        totalPlayer2Score += total; 
        displayPlayerScores(currentPlayer, totalPlayer2Score);       
    }

    if(totalPlayer1Score >= 100 || totalPlayer2Score >= 100) {
        declareWinner();
    }

    currentRolls = [];

    currentScore = 0;
    
    displayCurrentScore(currentScore);

    if(document.getElementById("p" + currentPlayer + "Check").hasAttribute("hidden")) {
        document.getElementById("p" + currentPlayer + "Check").removeAttribute("hidden");
    }

    document.getElementById("p" + currentPlayer + "Check").setAttribute("hidden", "true");

    currentPlayer = (currentPlayer == 1) ? 2:1;

    document.getElementById("p" + currentPlayer + "Check").removeAttribute("hidden");
    
}

/**
 * Gets an integer random value
 * @param minValue The inclusive min value integer
 * @param maxValue the inclusive max value integer
 */
function getRandomIntValue(minValue:number, maxValue:number):number {
    minValue = Math.floor(minValue); // Gets rid of decimal value
    maxValue = Math.floor(maxValue);
    return Math.floor((Math.random() * (maxValue - minValue + 1) + minValue));

}

function displayMessage(msg:string) {
    let display = "<p>" + msg + "<p>";
    document.getElementById("output").innerHTML = display;
}

function displayCurrentScore(score:number) {
    (<HTMLInputElement>document.getElementById("turnScore")).value = score.toString();

}

function displayPlayerScores(player:number, score: number) {
    (<HTMLInputElement>document.getElementById("player" + player +"Score")).value = score.toString();
}

function declareWinner() {
    if(totalPlayer1Score >= 100) {
        displayPlayerScores (1, 100);
        displayPlayerScores (2, 0);
        displayCurrentScore(0);

        displayMessage("<strong> Player 1 wins! <strong>")
    }
    else {
        displayPlayerScores (2, 100);
        displayPlayerScores (1, 0);
        displayCurrentScore(0);

        displayMessage("<strong> Player 2 wins! <strong>")
    }

    document.getElementById("roll").setAttribute("disabled", "true");
    document.getElementById("pass").setAttribute("disabled", "true");
}
