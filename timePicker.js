//ELEMENTOS
const timePicker = document.querySelector('.time-picker');

const hourElement = document.querySelector('.hr');
const minuteElement = document.querySelector('.min');

const hoursUp = document.querySelector('.hr-up');
const hoursDown = document.querySelector('.hr-down');
const minsUp = document.querySelector('.min-up');
const minsDown = document.querySelector('.min-down');

//HORA ATUAL
let d = new Date();

let hour = d.getHours();
let mins = d.getMinutes();
setTime();

//EVENT LISTENERS
hoursUp.addEventListener('click', hourGoesUp);
hoursDown.addEventListener('click', hourGoesDown);
minsUp.addEventListener('click', minsGoesUp);
minsDown.addEventListener('click', minsGoesDown);

hourElement.addEventListener('change', hourChange);
minuteElement.addEventListener('change', minuteChange);

//FUNÇÕES SETAS
function hourGoesUp() {
    hour++;
    if (hour > 23) {
        hour = 0;
    }
    setTime();
}

function hourGoesDown() {
    hour--;
    if (hour < 0) {
        hour = 23;
    }

    setTime();
}

function minsGoesUp() {
    mins++;
    if (mins > 59) {
        mins = 0;
        hourGoesUp();
    }
    setTime();
}

function minsGoesDown() {
    
    mins--;
    if (mins < 0) {
        mins = 59;
        hourGoesDown();
    }
    setTime();
}

//FUNÇÕES INPUT CHANGE
function hourChange(e) {
    if (e.target.value > 23) {
        e.target.value = 23;
    } else if (e.target.value <= '0' || "") {
        e.target.value = '00'
    }
    
    hour = e.target.value;
    
    setTime();
}

function minuteChange(e) {
    if (e.target.value > 59) {
        e.target.value = 59;
    } else if (e.target.value <= 0 || "") {
        e.target.value = '00'
    }

    mins = e.target.value;
    setTime();
}

//FUNÇÕES AUXILIARES
function setTime() {
    hourElement.value = formatTime(hour);
    minuteElement.value = formatTime(mins);
    timePicker.dataset.time = `${formatTime(hour)}:${formatTime(mins)}`
}

function formatTime(time) {
    let timeString = time.toString();
    
    if (timeString.length == 1) {
        time = `0${time}`;
    }

    return time;
}
