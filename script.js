'use strict';

// Help button elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector('.close-modal');
const btnDescription = document.querySelector('.btn-description');

// Dice Game Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceDisplay = document.querySelector('.dice');
const currentScorePlayer_0 = document.querySelector('#current--0');
const currentScorePlayer_1 = document.querySelector('#current--1');

// Help button logic
btnDescription.addEventListener('click', function () {
  modal.style.display = 'block';
  overlay.style.display = 'block';
});

const close = function () {
  modal.style.display = 'none';
  overlay.style.display = 'none';
};

closeModal.addEventListener('click', close);
overlay.addEventListener('click', close);

// PUT SCORE TO 0

// to store the actual score of player0 and player1 in the form of array, where 0th index = player0 and 1st index = player1.
let scores, currentScore, activePlayer, playingGame;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingGame = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScorePlayer_0.textContent = 0;
  currentScorePlayer_1.textContent = 0;
  diceDisplay.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

const togglePlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling the dice
rollDice.addEventListener('click', function () {
  if (playingGame) {
    // 1. generating random dice
    const dices = Math.floor(Math.random() * 6) + 1;
    // 2. display dice
    diceDisplay.classList.remove('hidden');
    diceDisplay.src = `dice-${dices}.png`;
    // 3. Check for rolled 1, if true switch to the next player
    if (dices !== 1) {
      currentScore += dices;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      togglePlayers();
    }
  }
});

// Hold button
btnHold.addEventListener('click', function () {
  if (playingGame) {
    // 1. Add the current score to the active players score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.check if players score is atleast 100 if yes then finish game
    if (scores[activePlayer] >= 100) {
      playingGame = false;
      diceDisplay.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      togglePlayers();
    }
  }
});

// Resetting Game (New Game button)
newGame.addEventListener('click', init);
