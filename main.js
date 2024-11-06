// elements

const btnStart = document.getElementById("start-timer");
const btnStop = document.getElementById("stop-timer");
const btnReset = document.getElementById("reset-timer");
const timer = document.getElementById("timer");
const timerForm = document.getElementById("timer-form");

// Class

class ControllerTime {
  constructor() {
    this.timer = 0;
    this.savedTime = null;
    this.intervalId = null;
    this.remainingTime = 0;
  }

  addTimer(value) {
    clearInterval(this.intervalId);
    this.remainingTime = null;
    this.timer = value;
    this.savedTime = this.timer;
  }

  startTimer() {
    let countDown = this.timer;

    if (this.remainingTime) {
      countDown = this.remainingTime;
    }

    this.intervalId = setInterval(() => {
      if (countDown === 0) {
        console.log("Il timer è 0");
        clearInterval(this.intervalId);
      } else if (countDown > 0) {
        countDown--;
        timer.innerText = countDown + `s`;
        console.log(countDown);
        if (countDown === 0) {
          timer.innerText = `Time's up!`;
          clearInterval(countDown);
          this.timer = 0;
          this.remainingTime = 0;
          this.savedTime = 0;
          console.log("timer ended");
        }
      }
    }, 1000);
  }

  pauseTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null; // Resetta l'ID dell'intervallo
      this.remainingTime = parseInt(timer.innerText);
      console.log(`Timer in pausa, tempo rimasto: ${this.remainingTime}`);
    }
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.remainingTime = null;
    this.timer = this.savedTime;
    timer.innerText = this.savedTime + "s";
  }
}

// event listeners

const controller = new ControllerTime();

btnStart.addEventListener("click", () => {
  console.log("timer started");
  controller.startTimer();
});

btnStop.addEventListener("click", () => {
  console.log("timer paused");
  controller.pauseTimer();
});

btnReset.addEventListener("click", () => {
  if (timer.innerText != "00s") {
    console.log("timer resetted");
    controller.resetTimer();
  }
});

timerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = document.getElementById("countdown-timer").value;
  let valueNumber = parseInt(value);
  console.log(valueNumber);
  if (!!!valueNumber) {
    alert("Inserisci un numero valido!");
    throw new Error("Parameter is not a valid number!");
  } else {
    timer.innerText = value + `s`;
    console.log("Timer Saved, the timer is: ", value, "seconds");
    console.log(`Il tipo del valore è: ${typeof value}`);
    console.log(
      `adesso il tipo del valore è stato convertito in: ${typeof valueNumber}`
    );
    controller.addTimer(valueNumber);
  }
});
