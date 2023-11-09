const $ = selector => document.querySelector(selector);
const $A = selector => document.querySelectorAll(selector)

const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'];

const stopSong = () => {
  sounds.forEach(sound => {
    const $audios = $("#" + sound);
    $audios.pause();
    $audios.currenTime = 0;
  })
}

sounds.forEach(sound => {
  const $btn = document.createElement("button");
  $btn.setAttribute("class", "btn");
  $btn.textContent = sound;

  $btn.addEventListener("click", () => {
    stopSong();

    $("#" + sound).play();

  });
  $("#buttons").appendChild($btn);
});

