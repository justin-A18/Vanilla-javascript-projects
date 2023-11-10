const productos = [
	{
		id: 1,
		name: "Roger",
		precio: 250,
		img: "https://fundom.com/cdn/shop/products/FU63213-1.png?v=1680721995",
	},
	{
		id: 2,
		name: "Shanks",
		precio: 300,
		img: "https://balyot.com/cdn/shop/products/Shanks_1800x1800_4a567512-5d83-4670-9758-f8c0fa43c8c2.png?v=1667798604",
	},
	{
		id: 3,
		name: "Oden",
		precio: 275,
		img: "https://pophuntersperu.com/cdn/shop/files/Funko-pop-one-piece-oden-1275_1.png?v=1688490477",
	},
	{
		id: 4,
		name: "Luffy",
		precio: 220,
		img: "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dwd15af3d8/images/funko/62701-2_C.png?sw=800&sh=800",
	},
	{
		id: 5,
		name: "Nami",
		precio: 150,
		img: "https://sgeek.pe/wp-content/uploads/2022/05/NAMI-328.png",
	},
	{
		id: 6,
		name: "Zoro Roronoa",
		precio: 250,
		img: "https://funko.com/dw/image/v2/BGTS_PRD/on/demandware.static/-/Sites-funko-master-catalog/default/dw236b5bb4/images/funko/54462-1.png?sw=800&sh=800",
	},
	{
		id: 7,
		name: "Crocodrile",
		precio: 170,
		img: "https://images-cdn.ubuy.co.in/636c15bd8816a75384614e41-funko-pop-animation-one-piece.jpg",
	},
	{
		id: 8,
		name: "Marco",
		precio: 275,
		img: "https://funkoeurope.com/cdn/shop/files/74474-POP-Animation-One-Piece---Marco_GLAM-WEB_1024x.png?v=1694609080",
	},
];

const $carritoModal = document.querySelector("#carritoModal");
const $containerFunkos = document.querySelector("#container-funkos");
const $carritoProductos = document.querySelector("#carritoProductos");
const $total = document.querySelector("#total");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
	crearProductos();
	cargarStorage(); // CARGAR DATOS DEL LOCALESTORAGE
});

document.addEventListener("click", (e) => {
	if (e.target.matches("#openCar")) {
		if ($carritoModal.classList.contains("hidden")) {
			$carritoModal.classList.remove("hidden");
			$carritoModal.classList.add("flex");
		}else{
			$carritoModal.classList.remove("flex");
			$carritoModal.classList.add("hidden");
		}
	}
});

const crearProductos = () => {
	const funkos = productos
		.map(({id,name,precio,img}) => {
			return `
    <li data-id="${id}" class="bg-white p-[1rem] flex flex-col gap-[1rem] rounded-[1rem] shadow-md">
      <i class='bx bx-heart bx-md'></i>
      <img class="w-[100%]" src="${img}" alt="${name}">
      <footer class="flex justify-between items-center">
        <div>
          <h3>${name}</h3>
          <p><b>$${precio}</b></p>
        </div>
        <i class='bx bx-plus bx-sm add-car bg-[#FF7C7E] rounded-[50%] text-white p-[.5rem] cursor-pointer'></i>
      </footer>
    </li>`;
		})
		.join("");
	$containerFunkos.innerHTML = funkos;
	const $btnAdd = $containerFunkos.querySelectorAll(".add-car");
	$btnAdd.forEach(btn =>{
		btn.addEventListener("click",agregarAlCarrito);
	});
};

const agregarAlCarrito = (e) => {
	$carritoProductos.innerHTML = "";
	const id = e.target.parentElement.parentElement.dataset.id;
	const funko = productos.find(producto => producto.id == id);
	carrito = Array.from(new Set([...carrito,funko]));
	renderCarrito();
};

const renderCarrito = () => {
	const funkos = carrito.map(({id,name,precio,img}) => {
		return `
			<li id="${id}" class="flex item-center justify-between w-[100%] border-b-[.1rem] border-black py-[.5rem]">
				<div class="flex items-center gap-[.5rem]">
					<img class="w-[3rem] h-[3rem] object-cover" src="${img}" alt="${name}">
					<div>
						<h3>${name}</h3>
						<p><b>$${precio}</b></p>
					</div>
				</div>
				<i class='bx delete-car bx-trash-alt bx-sm p-[.7rem] hover:bg-[#FF7C7E] cursor-pointer rounded-[50%] hover:text-white'></i>
			</li>
		`
	}).join("");

	$carritoProductos.innerHTML = funkos;

	const $btnDelete = $carritoProductos.querySelectorAll(".delete-car");
	$btnDelete.forEach(btn =>{
		btn.addEventListener("click",eliminarDelCarrito);
	});


	//CALCULA EL PRECIO TOTAL
	const results = carrito.reduce((total,precios) => {
		return total + precios.precio
	},0);

	$total.textContent = `$${results}`;

	//CARGAR DATOS AL LOCALE STORAGE
	sincronizarStorage();
}

const eliminarDelCarrito = (e) => {
	$carritoProductos.innerHTML = "";
	const id = e.target.parentElement.id;
	//FILTRA LOS QUE SEAN DIFERENTES AL ID Y LUEGO RENDERIZA EL CARRITO
	carrito = carrito.filter(producto => producto.id != id);
	renderCarrito();
}

const sincronizarStorage = () => {
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

const cargarStorage = () => {
	carrito = JSON.parse(localStorage.getItem("carrito") || []);
	renderCarrito();
} 







