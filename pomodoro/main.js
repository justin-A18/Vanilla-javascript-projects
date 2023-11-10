const $time = document.querySelector("#time");
const $start = document.querySelector("#start");
const $song = document.querySelector("#song");
let timer;
let isRunning = false;
let time = 25 * 60;

function starTimer() {
  if (!isRunning) {
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
    $start.textContent = "PAUSA";
  } else {
    clearInterval(timer);
    isRunning = false;
    $start.textContent = "RENUDAR";
  }
}

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  $time.textContent = `
  ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (time <= 0) {
    clearInterval(timer);
    isRunning = false;
    $start.textContent = "INICIAR"
    alert("Completado felicidades")
  } else {
    --time;
  }
}

$start.addEventListener("click", () => {
  starTimer();
  $song.play();
})

