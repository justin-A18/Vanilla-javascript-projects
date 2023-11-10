/* <========== LIMPIAR HTML DEL CONTENEDOR ============ > */

const limpiarHTML = (resultado) => {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
};

/* <========== LLENAR SELECTS YEAR ============ > */

export const llenarSelect = (min, max, parent) => {
	for (let i = min; i < max; i++) {
		// Corregir max
		const $option = document.createElement("option");
		$option.value = i;
		$option.textContent = i;
		parent.appendChild($option);
	}
};

/* <========== MOSTRAR AUTOS ============ > */

export const mostrarAutos = (autos, parent) => {
	const autosHTML = autos.map((auto) => {
		const { marca, modelo, year, puertas, transmision, color, precio } = auto;
		return `
    <p class="auto">
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision ${transmision} - Color ${color} - Precio ${precio}
    </p>`;
	});

	parent.innerHTML = autosHTML.join("");
};

/* <========== MANEJO DE ERROR DE NO RESULTADO ============ > */

const noResultado = (parent) => {
	limpiarHTML(parent);
	const mensajeError = document.createElement("p");
	mensajeError.classList.add("alerta-error");
	mensajeError.textContent = "No Hay Resultados, Intente Con Otra Búsqueda";

	parent.appendChild(mensajeError);
};

/* <========== FILTROS ============ > */

export const filtrarAutos = (autos, datosBusqueda, parent) => {
	const resultado = autos.filter((auto) => {
		return Object.entries(datosBusqueda).every(([clave, valor]) => {
			if (valor === null || valor === "") {
				return true;
			}

      if (clave === 'minimo') {
        return auto.precio >= parseFloat(valor);
      }

      if (clave === 'maximo') {
        return auto.precio <= parseFloat(valor);
      }

			return auto[clave] == valor;
		});
	});

	resultado.length ? mostrarAutos(resultado, parent) : noResultado(parent);
  console.log(resultado);
};
