// Variables
const $container = document.querySelector(".container");
const $resultado = document.querySelector("#resultado");
const $formulario = document.querySelector("#formulario");

//Event
document.addEventListener("DOMContentLoaded", (e) => {
	$formulario.addEventListener("submit", clima);
});

const clima = async (e) => {
	e.preventDefault();

	try {
    const KEY = "f357d934ec8de1518dd0af08563389c6";
		const $pais = document.querySelector("#pais").value;
		const $ciudad = document.querySelector("#ciudad").value;

		if ($ciudad === "" || $pais === "") {
      console.log('HLA');
		}

    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${KEY}`);

    if(!response.ok) throw {status: response.status, statusText: response.statusText}

    const data = await response.json();

    console.log(data);

	} catch (err) {
    console.log(err);
  }
};
