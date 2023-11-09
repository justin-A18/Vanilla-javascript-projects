import { autos } from "./db.js";
import { filtrarAutos, llenarSelect, mostrarAutos } from "./functions.js";

const max = new Date().getFullYear();
const min = max - 12;

const $year = document.querySelector("#year");
const $resultado = document.querySelector("#resultado");

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

document.addEventListener("change", (e) => {
  if (e.target.name === "marca") {
    datosBusqueda.marca = e.target.value;
  }

  if (e.target.name === "year") {
    datosBusqueda.year = parseInt(e.target.value);
  }

  if (e.target.name === "minimo") {
    datosBusqueda.minimo = parseInt(e.target.value);
  }

  if (e.target.name === "maximo") {
    datosBusqueda.maximo = parseInt(e.target.value);
  }

  if (e.target.name === "puertas") {
    datosBusqueda.puertas = parseInt(e.target.value);
  }

  if (e.target.name === "transmision") {
    datosBusqueda.transmision = e.target.value; 
  }

  if (e.target.name === "color") {
    datosBusqueda.color = e.target.value;
  }

  filtrarAutos(autos, datosBusqueda, $resultado);
});

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos, $resultado);

  llenarSelect(min, max, $year);
});
