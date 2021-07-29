let timeElapsed = 0;
let startTime = 0;
let test = undefined;

function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    let p = document.querySelector(".clock").textContent = time;
}

function start() {
    startTime = Date.now();
}

function timeStamp() {
    timeElapsed = Date.now() - startTime;
    renderTime();
}

function renderTime() {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let rem = 0;

    if (timeElapsed >= 3600000) {
        hours = Math.floor(timeElapsed / 3600000);
        rem = timeElapsed % 3600000;
    }
    else {
        hours = 0;
        rem = timeElapsed;
    } 
    if (rem >= 60000) {
        minutes = Math.floor(rem / 60000);
        rem = rem % 60000;
    }
    else {
        minutes = 0;
        rem = timeElapsed;
    }
    seconds = Math.floor(rem / 1000);

    let timer = '';
    if (hours < 10) timer += '0' + hours;
    else timer += hours;
    timer += ':';
    if (minutes < 10) timer += '0' + minutes;
    else timer += minutes;
    timer += ':';
    if (seconds < 10) timer += '0' + seconds;
    else timer += seconds;

    document.querySelector(".timer").textContent = timer;
}

document.getElementById("start").addEventListener("click", function() {
    document.getElementById("start").disabled = true;
    document.getElementById("start").style.background = "grey";
    document.getElementById("start").style.fontWeight = "bold";

    if (test === undefined) {
        start();
        test = setInterval(timeStamp, 1000);
    }
    else {
        startTime = Date.now() - timeElapsed;
        test = setInterval(timeStamp, 1000);
    }
});

document.getElementById("stop").addEventListener("click", function() {
    document.getElementById("start").disabled = false;
    document.getElementById("start").style.background = "white";
    document.getElementById("start").style.fontWeight = "normal";

    clearInterval(test);
});

document.getElementById("reset").addEventListener("click", function() {
    document.getElementById("start").disabled = false;
    document.getElementById("start").style.background = "white";
    document.getElementById("start").style.fontWeight = "normal";
    timeElapsed = 0;
    document.querySelector(".timer").textContent = 'press START to run the timer';
    clearInterval(test);
});

displayTime();
document.querySelector(".timer").textContent = 'press START to run the timer';
const createClock = setInterval(displayTime, 1000);
