const textDisplay = document.getElementById('textDisplay');
const inputField = document.getElementById('inputField');
const wpmDisplay = document.getElementById('wpm');
const timeDisplay = document.getElementById('time');
const restartBtn = document.getElementById('restartBtn');

let originalText = '';
let startTime = null;
let timerInterval = null;
let isTyping = false;

// Sample sentences
const texts = [
    "My name is mahfujur rahman.",
    "My new project for typing speed.",
    "Typing helps you improve your speed.",
    "Code daily to get better at problem solving.",
    "Web development includes HTML CSS and JavaScript."
];

function generateText() {
    originalText = texts[Math.floor(Math.random() * texts.length)];
    textDisplay.innerHTML = '';
    originalText.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        textDisplay.appendChild(span);
    });
}

function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
        const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
        timeDisplay.innerText = `${elapsedSeconds}s`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function calculateWPM() {
    const elapsedTimeInMinutes = (new Date() - startTime) / 1000 / 60;
    const numberOfWords = originalText.trim().split(/\s+/).length;
    const wpm = Math.round(numberOfWords / elapsedTimeInMinutes);
    wpmDisplay.innerText = `${wpm}`;
}

inputField.addEventListener('input', () => {
    const input = inputField.value;
    const spans = textDisplay.querySelectorAll('span');

    if (!isTyping) {
        isTyping = true;
        startTimer();
    }

    let correct = true;

    spans.forEach((char, i) => {
        const typedChar = input[i];
        if (typedChar == null) {
            char.classList.remove('correct', 'incorrect');
            correct = false;
        } else if (typedChar === char.innerText) {
            char.classList.add('correct');
            char.classList.remove('incorrect');
        } else {
            char.classList.add('incorrect');
            char.classList.remove('correct');
            correct = false;
        }
    });

    // Check if completely correct
    if (input.length === originalText.length && correct) {
        stopTimer();
        calculateWPM();
        inputField.disabled = true;
    }
});

restartBtn.addEventListener('click', () => {
    stopTimer();
    timeDisplay.innerText = '0s';
    wpmDisplay.innerText = '0';
    inputField.value = '';
    inputField.disabled = false;
    isTyping = false;
    generateText();
});

generateText();
