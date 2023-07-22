const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
const gameContainer = document.querySelector('.game-container');
const characterElement = document.getElementById('character');
const nextCharacterElement = document.getElementById('nextCharacterElement');
const correctCountElement = document.getElementById('correctCount');
const wrongCountElement = document.getElementById('wrongCount');

let currentCharacter = '';
let nextCharacter = '';
let timer = null;
let frequency = 30000; // default frequency in milliseconds (10 seconds)
let correctCount = 0;
let wrongCount = 0;

function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

function dropCharacter() {
  currentCharacter = nextCharacter;
  characterElement.textContent = currentCharacter;
  nextCharacter = getRandomCharacter();
  nextCharacterElement.textContent = nextCharacter;
  nextCharacterElement.classList.add('show');
  timer = setTimeout(dropCharacter, frequency);
}

function handleKeyPress(event) {
  const pressedKey = event.key.toUpperCase();
  const targetCharacter = currentCharacter.toUpperCase();

  if (pressedKey === targetCharacter) {
    correctCount++;
    correctCountElement.textContent = `✓: ${correctCount}`;
    clearTimeout(timer);
    dropCharacter();

    // Apply scale animation for correct typing
    gameContainer.classList.add('scale');
    // Reset the scale animation after 0.5 seconds
    setTimeout(() => {
      gameContainer.classList.remove('scale');
    }, 500);
  } else {
    wrongCount++;
    wrongCountElement.textContent = `✖: ${wrongCount}`;

    // Add shake effect and red border to the game container
    gameContainer.classList.add('shake');
    gameContainer.style.border = '4px solid red';

    // Reset the game container after 1 second
    setTimeout(() => {
      gameContainer.classList.remove('shake');
      gameContainer.style.border = '4px solid #007bff'; // Reset to the original blue border
    }, 1000);
  }
}

document.addEventListener('keypress', handleKeyPress);

// Start the game on page load
nextCharacter = getRandomCharacter();
nextCharacterElement.textContent = nextCharacter;
dropCharacter();

correctCountElement.textContent = `✓: 0`;
wrongCountElement.textContent = `✖: 0`;
