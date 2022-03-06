const stopwatch = document.querySelector("h1#stopwatch");
const startButton = document.querySelector("input#start");
const resetButton = document.querySelector("input#reset");

let startTime = 0;
let started = false;

function start() {
    startTime = new Date().getTime();
    started = true;
}
start();
