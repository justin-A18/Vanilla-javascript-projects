const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $submit = document.querySelector("#submit");
const $loader = document.querySelector(".loader");
const $send = document.querySelector(".enviado");

const iniciarApp = () => {
	$submit.disabled = true;
	$submit.classList.add("invisible");
};

const validarForm = (e) => {
	const exp = /^[\w\.-]+@[\w\.-]+\.\w+$/;

	if (e.target.type === "email") {
		if (exp.test(e.target.value) && $input.value !== "") {
			$submit.disabled = false;
			$submit.classList.remove("invisible");
		}else{
      $submit.disabled = true;
      $submit.classList.add("invisible");
    };
	};
};

const enviarForm = (e) => {
  e.preventDefault();
  $input.value = "";
  $loader.classList.add("visible");
  
  setTimeout(() => {
    $loader.classList.remove("visible");
    $send.classList.add("enviado-v");
    setTimeout(() => {
      $send.classList.remove("enviado-v");
    },3500);    
  },3000);
}

$submit.addEventListener("click",enviarForm);
$input.addEventListener("blur",validarForm);
document.addEventListener("DOMContentLoaded", iniciarApp);
