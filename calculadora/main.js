const $btns = document.querySelectorAll(".btn");
const $clear = document.querySelector(".clear");
const $input = document.querySelector("#input");
const $resultado = document.querySelector(".resultado");

function calculadora() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      obtenerResultado();
    }

    if (e.key === "Escape") {
      clear();
    }
  });

  $btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      obtenerValores(btn.value);
    });
  });

  $clear.addEventListener("click", (e) => {
    e.preventDefault();
    clear();
  });

  $resultado.addEventListener("click", (e) => {
    e.preventDefault();
    obtenerResultado();
  });

  function obtenerValores(value) {
    $input.value += value;
  }

  function clear() {
    $input.value = "";
  }

  function obtenerResultado() {
    try {
      const expresion = $input.value;
      const resultado = eval(expresion);
      $input.value = resultado;
    } catch (error) {
      $input.value = "ERROR"
    }

  }
}

calculadora();
