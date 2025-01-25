const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');
const feedback = document.getElementById('feedback');

let frame = 0;
let currentPattern = '';
let correctAnswer = '';

// Define patterns
const patterns = {
  circle: (t) => ({ x: 200 + 100 * Math.cos(t), y: 200 + 100 * Math.sin(t) }),
  rectangle: (t) => ({
    x: 200 + (t % 200 < 100 ? 100 : -100),
    y: 200 + (t % 200 < 100 ? 100 : -100) * Math.sign(t % 400 - 200),
  }),
  zigzag: (t) => ({ x: 200 + (t % 400 - 200), y: 200 + 50 * Math.sin(t / 10) }),
  random: (t) => ({
    x: 200 + (Math.random() - 0.5) * 200,
    y: 200 + (Math.random() - 0.5) * 200,
  }),
};

// Set a random pattern
function setRandomPattern() {
  const keys = Object.keys(patterns);
  correctAnswer = keys[Math.floor(Math.random() * keys.length)];
  currentPattern = patterns[correctAnswer];
}

// Draw the dot with glow effect
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const t = frame / 20;
  const { x, y } = currentPattern(t);
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(58, 123, 213, 0.8)';
  ctx.shadowBlur = 15;
  ctx.shadowColor = 'rgba(58, 123, 213, 0.6)';
  ctx.fill();
  ctx.closePath();
  frame++;
  requestAnimationFrame(draw);
}

// Check user's answer
function checkAnswer(answer) {
  if (answer === correctAnswer) {
    showFeedback('Correct!', '#2ecc71');
  } else {
    showFeedback('Wrong. Try again!', '#e74c3c');
  }
  setRandomPattern();
  frame = 0;
}

// Show feedback message
function showFeedback(message, color) {
  feedback.textContent = message;
  feedback.style.color = color;
  feedback.classList.add('show');
  setTimeout(() => feedback.classList.remove('show'), 1500);
}

// Start the game
setRandomPattern();
draw();
