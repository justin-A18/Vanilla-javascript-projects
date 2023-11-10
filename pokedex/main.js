const BASE_URL = "https://pokeapi.co/api/v2";
const $pokeCards = document.querySelector("#pokemons");
const $categories = document.querySelector("#categories");

const formatPokemonId = (id) => id.toString().padStart(3, "0");

const fetchPokemonData = async (url) => {
	try {
		const response = await fetch(url);
		const pokemonData = await response.json();
		return pokemonData;
	} catch (error) {
		throw new Error(`Error fetching data: ${error.message}`);
	}
};

const categories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/type`);
		const data = await response.json();
		const categories = data.results
			.map((category) => {
				return `
          <li class="categories__links ${category.name}">
            <a href="#" class="links" data-category="${category.name}">
              ${category.name}
            </a>
          </li>
        `;
			})
			.join("");
		$categories.innerHTML = categories;

		const $categoryLinks = $categories.querySelectorAll(".links");

		$categoryLinks.forEach((link) => {
			link.addEventListener("click", async (e) => {
				e.preventDefault();

				const type = e.target.getAttribute("data-category");

				try {
					const response = await fetch(`${BASE_URL}/type/${type}`);
					const data = await response.json();
					const pokemonOfType = data.pokemon.map(async (pokemon) => {
						const pokemonData = await fetchPokemonData(pokemon.pokemon.url);
						const types = pokemonData.types
							.map(
								(type) =>
									`<span class="type__btn ${type.type.name}">${type.type.name}</span>`
							)
							.join("");
						const id = formatPokemonId(pokemonData.id);
						const imageUrl =
							pokemonData.sprites.front_default ||
							"https://cdn-icons-png.flaticon.com/256/3814/3814210.png";
						return `
              <article class="card">
                <div class="card__img">
                  <img class="img" src="${imageUrl}" alt="${pokemonData.name}">
                  <p class="card__id">#${id}</p>
                </div>
                <h2 class="card__name">${pokemonData.name}</h2>
                <p class="card__type">${types}</p>
                <p class="card__tamanio">
                  <span>Height: ${pokemonData.height}m</span>
                  <span>Weight: ${pokemonData.weight}kg</span>
                </p>
              </article>
            `;
					});

					const resolvedPokemonOfType = await Promise.all(pokemonOfType);
					$pokeCards.innerHTML = resolvedPokemonOfType.join("");
				} catch (error) {
					console.error(
						`Error fetching Pokémon of type ${type}: ${error.message}`
					);
				}
			});
		});
	} catch (error) {
		throw new Error(`Error fetching categories: ${error.message}`);
	}
};

const createTypeButtons = (types) =>
	types
		.map(
			(type) =>
				`<span class="type__btn ${type.type.name}">${type.type.name}</span>`
		)
		.join("");

const createPokemonCard = (pokemonData) => {
	const types = createTypeButtons(pokemonData.types);
	const id = formatPokemonId(pokemonData.id);
	const imageUrl =
		pokemonData.sprites.front_default ||
		"https://cdn-icons-png.flaticon.com/256/3814/3814210.png";

	return `
    <article class="card">
      <div class="card__img">
        <img class="img" src="${imageUrl}" alt="${pokemonData.name}">
        <p class="card__id">#${id}</p>
      </div>
      <h2 class="card__name">${pokemonData.name}</h2>
      <p class="card__type">${types}</p>
      <p class="card__tamanio">
        <span>Height: ${pokemonData.height}m</span>
        <span>Weight: ${pokemonData.weight}kg</span>
      </p>
    </article>
  `;
};

const fetchAndDisplayPokemonOfType = async (type) => {
	try {
		const response = await fetch(`${BASE_URL}/type/${type}`);
		const data = await response.json();
		const pokemonOfType = await Promise.all(
			data.pokemon.map(async (pokemon) => {
				const pokemonData = await fetchPokemonData(pokemon.pokemon.url);
				return createPokemonCard(pokemonData);
			})
		);

		$pokeCards.innerHTML = pokemonOfType.join("");
	} catch (error) {
		console.error(`Error fetching Pokémon of type ${type}: ${error.message}`);
	}
};

const fetchAndDisplayAllPokemon = async () => {
	try {
		const response = await fetch(`${BASE_URL}/pokemon`);
		const data = await response.json();
		const pokemonCards = await Promise.all(
			data.results.map(async (pokemon) => {
				const pokemonData = await fetchPokemonData(pokemon.url);
				return createPokemonCard(pokemonData);
			})
		);

		$pokeCards.innerHTML = pokemonCards.join("");
	} catch (error) {
		console.error(`Error fetching Pokémon data: ${error.message}`);
	}
};

const setupEventListeners = () => {
	$categories.addEventListener("click", async (e) => {
		e.preventDefault();
		const type = e.target.getAttribute("data-category");
		await fetchAndDisplayPokemonOfType(type);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	categories()
	fetchAndDisplayAllPokemon();
	setupEventListeners();
});
