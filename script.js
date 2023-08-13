const words = [
  { word: "harry", hint: "A character of Harry Potter movie." },
  { word: "griffindor", hint: "One of the houses in Harry Potter" },
  { word: "elder_wand", hint: "Most powerful wand in history to exist" },
  { word: "voldemort", hint: "A character of Harry Potter movie series" },
  { word: "Professor_snape", hint: "A character of Harry Potter movie." }
];

let selectedWord, wordHint;
let guessedLetters = [];
let remainingAttempts = 6;

const wordDisplay = document.getElementById("word-display");
const guessesDisplay = document.getElementById("guesses");
const messageDisplay = document.getElementById("message");
const hangmanImage = document.getElementById("hangman-image").querySelector("img");
const hintButton = document.getElementById("hint");
const hintDisplay = document.getElementById("hint-display");

function initializeGame() {
  const randomIndex = Math.floor(Math.random() * words.length);
  selectedWord = words[randomIndex].word;
  wordHint = words[randomIndex].hint;
  guessedLetters = [];
  remainingAttempts = 6;
  messageDisplay.textContent = "";
  hintDisplay.textContent = "";
  displayWord();
  updateGuesses();
  hangmanImage.src = `images/0.jpg`;
  hintButton.disabled = false;
  document.addEventListener("keydown", handleKeyPress);
}

function displayWord() {
  let displayText = "";
  for (const letter of selectedWord) {
    if (guessedLetters.includes(letter)) {
      displayText += letter + " ";
    } else {
      displayText += "_ ";
    }
  }
  wordDisplay.textContent = displayText;
}

function updateGuesses() {
  guessesDisplay.textContent = "Guesses: " + guessedLetters.join(", ");
}

function checkWin() {
  if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
    messageDisplay.textContent = "Congratulations! You won!";
    displayGif("win"); 
    disableInput();
  } else if (remainingAttempts === 0) {
    messageDisplay.textContent = "Game over! The word was: " + selectedWord;
    displayGif("lose"); 
    disableInput();
  } else {
    hangmanImage.src = `images/${10 - remainingAttempts}.jpg`;
  }
}

function displayGif(outcome) {
  const gifElement = document.createElement("img");
  gifElement.classList.add("outcome-gif");

  if (outcome === "win") {
    gifElement.src = "images/win.gif"; 
  } else if (outcome === "lose") {
    gifElement.src = "images/lost.gif";
  }

  messageDisplay.appendChild(gifElement);
}

function disableInput() {
  document.removeEventListener("keydown", handleKeyPress);
  hintButton.disabled = true;
}

function handleKeyPress(event) {
  const guessedLetter = event.key.toLowerCase();
  if (/^[a-zA-Z]$/.test(guessedLetter) && !guessedLetters.includes(guessedLetter)) {
    guessedLetters.push(guessedLetter);
    displayWord();
    updateGuesses();
    if (!selectedWord.includes(guessedLetter)) {
      remainingAttempts--;
    }
    checkWin();
  }
}

hintButton.addEventListener("click", () => {
  hintDisplay.textContent = `Hint: ${wordHint}`;
  hintButton.disabled = true;
});

initializeGame();
