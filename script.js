"use strict";

// Class Selectors
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");

const diceElement = document.querySelector(".dice");
const buttonNewGame = document.querySelector(".btn--new");
const buttonRollDice = document.querySelector(".btn--roll");
const buttonHold = document.querySelector(".btn--hold");

// Set all the default values
const playerScores = [0, 0];
let currentScore, activePlayer, gameState;

const setDefault = function () {
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
  diceElement.classList.add("hidden");

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  playerScores.splice(0, -1, 0, 0);
  currentScore = 0;
  activePlayer = 0;
  gameState = true;
};
setDefault();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};
//When roll dice button is pressed: if it is a 1 switch players from player 1 to player 2
// player 1 should be default player
buttonRollDice.addEventListener("click", function () {
  if (gameState) {
    // generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice based on the dice roll
    diceElement.classList.remove("hidden");
    diceElement.src = `dice/dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // add dice roll to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScore0.textContent = currentScore; // CHANGE LATER BASED ON ACTIVE PLAYER ^
    } else {
      switchPlayer();
    }
  }
});

// Add functionality for hold button
// when pressed, active player's current score should be added to the global score
// if the score is < 100 then it should switch to the next player; otherwise active player wins

buttonHold.addEventListener("click", function () {
  if (gameState) {
    // add current score to active player's global score
    playerScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playerScores[activePlayer];
    // check if player's score is >= 100
    if (playerScores[activePlayer] >= 100) {
      // finish the game
      gameState = false;
      // assign player winner class to the active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Add functionality for the new game reset button
// remove winner class and reset all scores to 0
buttonNewGame.addEventListener("click", function () {
  // remove winner class
  // set player 1 to be the active player
  // set all current scores to 0
  // set global scores to 0
  setDefault();
});
