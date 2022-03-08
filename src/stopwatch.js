const stopwatch = document.querySelector("h1#stopwatch");
const startButton = document.querySelector("input#start");
const resetButton = document.querySelector("input#reset");

let startTime = 0;
let startTimeAddPause = 0;
let endTime = 0;
let isRunning = false;
let stopped = false;
let displayTrigger = false;

const CLICKED = "clicked";

function start() {
    if (!stopped) {
        now = new Date().getTime();
        startTime = now;
        startTimeAddPause = now;
    } else {
        stopped = false;
        now = new Date().getTime();
        startTimeAddPause += now - endTime;
    }
    isRunning = true;
    startButton.value = "정지";
}

function stop() {
    endTime = new Date().getTime();
    isRunning = false;
    stopped = true;
    displayTrigger = true;
    startButton.value = "다시 시작";
}

function makeText(time) {
    const hour = String(Math.floor(time / 3600000) % 24).padStart(2, "0");
    const min = String(Math.floor(time / 60000) % 60).padStart(2, "0");
    const sec = String(Math.floor(time / 1000) % 60).padStart(2, "0");
    const msec = String(Math.floor(time / 10) % 100).padStart(2, "0");

    return `${hour}:${min}:${sec}.${msec}`;
}

function showTimeToStopwatch() {
    let text;
    if (isRunning) {
        text = makeText(new Date().getTime() - startTimeAddPause);
    } else if (displayTrigger) {
        if (stopped) {
            text = makeText(endTime - startTimeAddPause);
        } else {
            text = "00:00:00.00";
        }
    }
    if (isRunning || displayTrigger) {
        displayTrigger = false;
        stopwatch.innerText = text;
    }
}

function reset() {
    startTime = 0;
    startTimeAddPause = 0;
    endTime = 0;
    isRunning = false;
    stopped = false;
    displayTrigger = true;
    startButton.value = "시작";
}

function startButtonHandler() {
    if (isRunning) {
        stop();
    } else {
        start();
    }
}
function resetButtonHandler() {
    reset();
}

startButton.addEventListener("click", startButtonHandler);
resetButton.addEventListener("click", resetButtonHandler);

window.addEventListener("keydown", e => {
    if (e.key === " ") {
        startButtonHandler();
        startButton.classList.add(CLICKED);
        setTimeout(() => {
            startButton.classList.remove(CLICKED);
        }, 100);
    } else if (e.key === "Shift") {
        resetButtonHandler();
        resetButton.classList.add(CLICKED);
        setTimeout(() => {
            resetButton.classList.remove(CLICKED);
        }, 100);
    }
});
setInterval(showTimeToStopwatch, 10);
