// ELEMENTOS DOM
const $btn = document.querySelector("#btn");
const $input = document.querySelector("#length");
const $pizarra = document.querySelector("#pizarra");

// Define los conjuntos de caracteres permitidos
const caracteresPermitidos = {
  minusculas: 'abcdefghijklmnopqrstuvwxyz',
  mayusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeros: '0123456789',
  especiales: '!@#$%^&*()_+[]{}|;:,.<>?',
};

const agregarCaracteres = (checkboxes) => {
  let caracteres = "";
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked && caracteresPermitidos[checkbox.id]) {
      caracteres += caracteresPermitidos[checkbox.id];
    };
  });

  return caracteres;
}

const generatePassword = () => {
  const $checkboxes = document.querySelectorAll(".check");
  const caracteresPermitidos = agregarCaracteres($checkboxes);
  const longitud = $input.value;

  if (caracteresPermitidos.length === 0 || longitud <= 0) {
    $pizarra.innerText = `Por favor, selecciona al menos una opción y especifica una longitud válida`;
    return;
  }

  let contraseña = "";

  for (let i = 0; i < longitud; i++) {
    const caracteresAleatorios = caracteresPermitidos[Math.floor(Math.random() * caracteresPermitidos.length)];
    contraseña += caracteresAleatorios;
  }

  $pizarra.innerText = contraseña;
}

$btn.addEventListener("click", generatePassword);