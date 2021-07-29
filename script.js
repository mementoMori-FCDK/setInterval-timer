let timeElapsed = 0;            // elapsed time tracker
let startTime = 0;              // stores the start time value
let test = undefined;           // stores interval pointer

/**
 * display the clock
 */
function displayTime() {
    let date = new Date();
    let time = date.toLocaleTimeString();
    let p = document.querySelector(".clock").textContent = time;
}

/**
 * start the timer
 */
function start() {
    startTime = Date.now();
}

/**
 * update a timer
 * calls renderTime() (see renederTime() documentation)
 */
function timeStamp() {
    timeElapsed = Date.now() - startTime;
    renderTime();
}

/**
 * renders timeElapsed to hours, minutes, seconds
 * updates the timer text content
 */
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

/**
 * start button click event listener
 * disables and changes the style of the button on click
 * updates startTime if timer was unpaused
 */
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

/**
 * stop button click event listener
 * enables the start button
 */
document.getElementById("stop").addEventListener("click", function() {
    document.getElementById("start").disabled = false;
    document.getElementById("start").style.background = "white";
    document.getElementById("start").style.fontWeight = "normal";

    clearInterval(test);
});

/**
 * reset button click event listener
 * resets the timer
 * enables the start button
 */
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
