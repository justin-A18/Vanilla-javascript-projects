const $formCalc = document.querySelector("#calc");

const getValues = (e) => {
	const food = document.querySelector("#comida").value;
	const destiny = document.querySelector("#destino").value;
	const budget = document.querySelector("#presupuesto").value;
	const transport = document.querySelector("#transporte").value;
	const acomodation = document.querySelector("#alojamiento").value;

	return { destiny, budget, acomodation, transport, food };
};

const calcExpenes = (e) => {
	e.preventDefault();
	const { destiny, budget, acomodation, transport, food } = getValues();
	let expens = parseInt(acomodation) + parseInt(transport) + parseInt(food);
	let balance = budget - expens;

	UI(destiny, expens, balance);
};

const UI = (destiny,expens,balance) => {
	const $results = document.querySelector("#results");
  $results.textContent = "";
  
  const $ul = document.createElement("ul");
  $ul.setAttribute("class", "flex flex-col gap-[1rem]");
	$ul.innerHTML = `
    <li class="flex gap-[1rem] items-center">
      <h2 class="text-[1.2rem] text-white">
        <i class='bx bxs-plane-alt'></i> Destino:
      </h2>
      <p class="text-[1.2rem] text-gray-300">${destiny}</p>
    </li>
    <li class="flex gap-[1rem] items-center">
      <h2 class="text-[1.2rem] text-white">
        <i class='bx bxs-wallet'></i> Presupuesto:
      </h2>
      <p class="text-[1.2rem] text-gray-300">${expens}</p>
    </li>
    <li class="flex gap-[1rem] items-center">
      <h2 class="text-[1.2rem] text-white">
        <i class='bx bx-dollar'></i> Resto:
      </h2>
      <p class="text-[1.2rem] text-gray-300">${balance}</p>
    </li>
  `;
  $results.appendChild($ul);

  clear();
};

const clear = () => {
  document.querySelector("#calc").reset();
}

$formCalc.addEventListener("submit", calcExpenes);

