'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const startButton = document.querySelector('.start.button');
const gameScore = document.querySelector('.game-score');
const startMessage = document.querySelector('.message-start');
const loseMessage = document.querySelector('.message-lose');
const winMessage = document.querySelector('.message-win');

startButton.addEventListener('click', () => {
  if (game.getStatus() === 'playing') {
    game.restart();

    loseMessage.classList.add('hidden');
  } else {
    game.start();

    startButton.textContent = 'Restart';
    startButton.classList.replace('start', 'restart');
    startMessage.classList.add('hidden');
  }

  updateGameField();
});

const gameField = document.querySelector('.game-field');

function updateGameField() {
  const state = game.getState();

  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      const cell = gameField.rows[i].cells[j];
      const value = state[i][j];

      cell.textContent = value === 0 ? '' : value;

      cell.className = 'field-cell';

      if (value !== 0) {
        cell.classList.add(`field-cell--${value}`);
      }
    }
  }

  gameScore.textContent = game.getScore();

  if (game.getStatus() === 'win') {
    winMessage.classList.remove('hidden');
  }
}

document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  let moved = false;

  switch (e.key) {
    case 'ArrowLeft':
      moved = game.moveLeft();
      break;
    case 'ArrowRight':
      moved = game.moveRight();
      break;
    case 'ArrowUp':
      moved = game.moveUp();
      break;
    case 'ArrowDown':
      moved = game.moveDown();
      break;
  }

  if (moved) {
    updateGameField();

    if (game.checkGameOver()) {
      loseMessage.classList.remove('hidden');
    }
  }
});
