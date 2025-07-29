// Load sounds
const clickSound = new Audio("assets/sounds/click.mp3");
const winSound = new Audio("assets/sounds/win.mp3");
const failSound = new Audio("assets/sounds/fail.mp3");

// Select boy bubble once globally
const boyBubble = document.querySelector(".boy-bubble");

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  const msg = document.querySelector(".message");
  msg.innerHTML = message.replace(/\n/g, "<br>"); // allow line breaks

  // Animate speech bubble
  msg.classList.remove("pop");
  void msg.offsetWidth;
  msg.classList.add("pop");
};

document.querySelector(".check").addEventListener("click", function () {
  clickSound.play();
  const guessInput = document.querySelector(".guess");
  const guess = Number(guessInput.value);
  const girlBubble = document.querySelector(".left-bubble");

  if (!guess) {
    displayMessage("Input a Number !!!");
  } else if (guess === secretNumber) {
    winSound.play();
    displayMessage("Correct Number!");
    // document.querySelector(".number").textContent = secretNumber;
    document.body.style.backgroundColor = "#60b347";

    girlBubble.classList.add("bubble-blast");

    if (boyBubble)
      boyBubble.innerHTML = `Hurray !!!<br>The Number Was<br>${secretNumber}`;

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "Too high!" : "Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      failSound.play();
      displayMessage(`You lost the game !!!\nMy Number Was \n ${secretNumber}`);
      document.querySelector(".score").textContent = 0;

      girlBubble.classList.add("bubble-blast");

      if (boyBubble) boyBubble.textContent = "!!!";
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  clickSound.play();
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage("Guess my number!");
  document.querySelector(".score").textContent = score;
  // document.querySelector(".number").textContent = "?";
  document.body.style.backgroundColor = "#000";

  document.querySelector(".left-bubble").classList.remove("bubble-blast");

  // Reset boy's bubble to original input
  if (boyBubble) {
    boyBubble.innerHTML = `<input
      type="number"
      class="guess"
      min="1"
      max="20"
      placeholder="1–20"
    />`;
  }
});

const starContainer = document.getElementById("stars-container");

for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${2 + Math.random() * 3}s`;
  star.style.animationDelay = `${Math.random() * 5}s`;
  starContainer.appendChild(star);
}
