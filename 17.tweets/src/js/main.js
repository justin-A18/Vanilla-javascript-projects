const $image = document.getElementById("image");
const $deleteButton = document.querySelector("#delete");
const $fileInput = document.getElementById("file");
const $containerImage = document.querySelector("#container_img");

const $form = document.querySelector("#form");
const $tweetsContainer = document.querySelector("#tweets");
let tweets = [];
let img = "";

$fileInput.addEventListener("change", handleFileInputChange);
$deleteButton.addEventListener("click", handleDeleteButtonClick);
$form.addEventListener("submit", crearTweet);

document.addEventListener("DOMContentLoaded", () => {
	tweets = JSON.parse(localStorage.getItem("tweets")) || [];
	crearHTML();
});

function handleFileInputChange() {
	const file = $fileInput.files[0];

	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			img = `<img class="w-[100%] h-[25rem] object-cover" src="${e.target.result}" alt="image"> `;
			setImage(img);
			$image.src = e.target.result;
		};
		reader.readAsDataURL(file);
	} else {
		setImage("");
	}
}

function handleDeleteButtonClick() {
	$image.src = "";
	img = "";
	$containerImage.classList.toggle("hidden");
}

function setImage(src) {
	$image.src = src || "";
	$containerImage.classList.toggle("hidden", !src);
}

function crearTweet(e) {
	e.preventDefault();

	const { value } = document.querySelector("#text");
	if (value === "" && img === "") return;
	const tweetObj = {
		id: new Date().getTime(),
		text: value,
		img,
	};

	tweets.push(tweetObj);

	crearHTML();
	$form.reset();

	setImage();
}

function crearHTML() {
	limpiarHTML();

	if (tweets.length > 0) {
		const tweetElements = tweets
			.map((item) => {
			return `
        <li data-id="${item.id}" class="bg-icons w-[90%] sm:w-[25rem] py-[1rem] px-[1.5rem] rounded-[1rem] flex gap-[1rem]">
          <div class="flex flex-col gap-[1rem] w-[100%]">
          <header class="flex justify-between items-center w-[100%]">
            <div class="flex gap-[1rem] items-center">
              <img class="w-[3rem] h-[3rem] rounded-[50%]" src="./src/img/waifu.jpg" alt="perfil">
              <h2><strong>@user123</strong></h2>
            </div>
            <i class='bx bx-trash bx-md hover:text-red-500 cursor-pointer'></i>
          </header>
          <p>${item.text}</p>
          ${item.img}
          </div>
        </li>`;
      }).join("");

		$tweetsContainer.innerHTML = tweetElements;
    const $trashIcons = $tweetsContainer.querySelectorAll(".bx-trash");
    $trashIcons.forEach(($trash) => {
      $trash.addEventListener("click", deleteTweet);
    });
	}
	sincronizarStorage();
}

function deleteTweet(e) {
	const id = e.target.parentElement.parentElement.parentElement.dataset.id;
	tweets = tweets.filter((tweet) => tweet.id != id);
	crearHTML();
}

function limpiarHTML() {
	$tweetsContainer.innerHTML = "";
}

function sincronizarStorage() {
	localStorage.setItem("tweets", JSON.stringify(tweets));
}
