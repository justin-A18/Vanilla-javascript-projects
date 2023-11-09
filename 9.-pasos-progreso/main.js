// <=====================SELECTORES=========================> 
const $ = selector => document.querySelector(selector); 
const $A = selector => document.querySelectorAll(selector)

const $progress = $('#progress');
const $prev = $('#prev');
const $next = $('#next');
const $circles = $A('.circle');

let currentTime = 1;

const update = () => {
  $circles.forEach((circle, index) => {
    //EVALUA SI EL INDEX ES MENOR A CURRENT_TIME A CADA CIRCLE SE AGREGA EL ACTIVE.
    (index < currentTime)
      ? circle.classList.add("active")
      : circle.classList.remove("active")
  });

  //<========================BARRA============================>

  const $actives = $A(".active");
  $progress.style.width = ($actives.length - 1) / ($circles.length - 1) * 100 + "%";

  //<=================CONDICION PARA QUE LOS BTNS====================>

  if (currentTime === 1) { $prev.disabled = true }
  else if (currentTime === $circles.length) { $next.disabled = true }
  else {
    $prev.disabled = false;
    $next.disabled = false;
  }
};

//<======================EVENTO CLICK PARA QUE AVANCE=======================>

$next.addEventListener('click', () => {
  currentTime++;
  if (currentTime > $circles.length) { currentTime = $circles.length };    
  update();
});

//<=====================EVENTO CLICK PARA QUE RETROCEDA=====================>

$prev.addEventListener("click", () => {
  currentTime--;
  if (currentTime < 1) { currentTime = 1 };
  update();
});



