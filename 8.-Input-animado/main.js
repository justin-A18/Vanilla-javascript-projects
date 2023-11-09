const $ = selector => document.querySelector(selector);

const $btn = $(".btn");
const $input =  $(".input");
const $search = $(".search");

$btn.addEventListener("click", (e) => {
  e.preventDefault();
  $search.classList.toggle("active");
  $input.focus();
})