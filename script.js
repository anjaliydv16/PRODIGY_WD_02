
let hours = 0;
let minutes = 0;
let seconds = 0;
let intervalId;
let isRunning = false;
let lapTimes = [];

const display = document.querySelector('.display');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const lapsList = document.querySelector('#laps');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes === 60) {
                hours++;
                minutes = 0;
            }
            updateDisplay();
        }, 1000);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
    }
}

function resetStopwatch() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapTimes = [];
    updateDisplay();
    lapsList.innerHTML = '';
}

function updateDisplay() {
    display.innerHTML = `
        <span id="hours">${padZero(hours)}</span>:
        <span id="minutes">${padZero(minutes)}</span>:
        <span id="seconds">${padZero(seconds)}</span>
    `;
}

function padZero(time) {
    return (time < 10 ? '0' : '') + time;
}

function lap() {
    const lapTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    lapTimes.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}