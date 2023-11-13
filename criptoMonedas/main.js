const $criptomonedasSelect = document.querySelector("#criptomonedas");
const $monedaSelect = document.querySelector("#moneda");
const $formulario = document.querySelector("#formulario");
const $resultado = document.querySelector("#resultado");

const objBusqueda = {
	moneda: "",
	criptomoneda: "",
};

document.addEventListener("DOMContentLoaded", () => {
	consultarCriptomonedas();

	$formulario.addEventListener("submit", submitFormulario);
	$criptomonedasSelect.addEventListener("change", leerValor);
	$monedaSelect.addEventListener("change", leerValor);
});

const consultarCriptomonedas = async () => {
	try {
		const response = await fetch(
			"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
		);

		if (!response.ok)
			throw { status: response.status, statusText: response.statusText };

		const data = await response.json();

		const criptoName = data.Data;
		selectCriptomonedas(criptoName);
	} catch (err) {
		const mensaje = err.statusText || "Ocurrio un error";
		console.log(`Error ${err.status}: ${mensaje}`);
	}
};

function selectCriptomonedas(data) {
	data.forEach((cripto) => {
		const { FullName, Name } = cripto.CoinInfo;
		const $option = document.createElement("option");
		$option.value = Name;
		$option.textContent = FullName;
		$criptomonedasSelect.appendChild($option);
	});
}

function leerValor(e) {
	objBusqueda[e.target.name] = e.target.value;
}

const consultarApi = async () => {
	try {
		const { moneda, criptomoneda } = objBusqueda;

		const response = await fetch(
			`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
		);

		if (!response.ok)
			throw { status: response.status, statusText: response.statusText };

		const data = await response.json();
		const cotizar = data.DISPLAY[criptomoneda][moneda];
		mostraCotizacion(cotizar);
	} catch (err) {
		const mensaje = err.statusText || "Ocurrio un error";
		console.log(`Error ${err.status}: ${mensaje}`);
	}
};

function submitFormulario(e) {
	e.preventDefault();
	const { moneda, criptomoneda } = objBusqueda;

	if (moneda === "" || criptomoneda === "") {
    mostrarAlerta();
    return;
  };

	consultarApi();
}

function mostraCotizacion(cotizacion) {
  $resultado.textContent = "";

	const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

	const result = `
    <p class="info">El Precio es: <span> ${PRICE} </span></p>
    <p class="info">Precio más alto del día: <span>${HIGHDAY}</span> </p>
    <p class="info">Precio más bajo del día: <span>${LOWDAY}</span> </p>
    <p class="info">Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
    <p class="info">Última Actualización: <span>${LASTUPDATE}</span></p>
  `;

  $resultado.innerHTML = result;
}

function mostrarAlerta(){
  $resultado.textContent = "";
  const $text = document.createElement("p");
  $text.textContent = "Ambos campos son obligatorios";
  $text.setAttribute("class","info-error");
  $resultado.appendChild($text);

  setTimeout(() => {
    $resultado.textContent = "";
  }, 3000);
}