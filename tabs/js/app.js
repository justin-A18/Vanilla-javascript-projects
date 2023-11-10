const $tabs = document.querySelectorAll("[data-id]");
const $container = document.querySelector("#container");
const $articles = document.querySelectorAll(".articles");

$tabs.forEach((tab) => {
	tab.addEventListener("click", (e) => {
		const id = e.target.dataset.id;
		if (id) {
			$articles.forEach((article) => {
				article.classList.remove("flex");
				article.classList.add("hidden");
			});

			const $selectArticle = $container.querySelector(`#${id}`);

			if ($selectArticle) {
				$selectArticle.classList.remove("hidden");
				$selectArticle.classList.add("flex");
			}
		}
	});
});
