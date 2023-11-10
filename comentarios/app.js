const comments = [];

const $input = document.createElement("input");
$input.setAttribute("class","form__input");
$input.setAttribute("placeholder","ingrese su comentario")

const $inputContainer = document.createElement("form");
$inputContainer.setAttribute("class","comment__form");
$inputContainer.appendChild($input);

const $commentsContainer = document.querySelector("#comments");
$commentsContainer.appendChild($inputContainer);

const $modal = document.querySelector(".modal");
const $closeModal = document.querySelector("#close-modal");

document.addEventListener("click", e => {
	if(e.target.matches("#open-modal")){
		$modal.classList.remove("hidden")
	}

	if(e.target.matches("#close-modal")){
		$modal.classList.add("hidden");
	}
})


const handleEnter = (e, current) => {
	if (e.key === "Enter" && e.target.value.trim() !== "") {
		const newComment = {
			text: e.target.value,
			likes: 0,
			responses: [],
		};

		current === null
			? comments.unshift(newComment)
			: current.responses.unshift(newComment);

		e.target.value = "";
		$commentsContainer.innerHTML = "";
		$commentsContainer.appendChild($inputContainer);
		renderComments(comments, $commentsContainer);
	}
};

$input.addEventListener("keydown", (e) => handleEnter(e, null));

const renderComments = (arr, parent) => {
	arr.forEach((element) => {
		const $commentContainer = document.createElement("div");
		$commentContainer.setAttribute("class","comment")
		const $responsesContainer = document.createElement("div");
		const $replyButton = document.createElement("button");
		const $likeButton = document.createElement("button");

		$replyButton.textContent = "Reply";
		$likeButton.textContent = "Like";

		$replyButton.addEventListener("click", (e) => {
			const $newInput = $inputContainer.cloneNode(true);
			$newInput.value = "";
			$newInput.focus();
			$newInput.addEventListener("keydown", (e) => {
				handleEnter(e, element);
			});
			$commentContainer.insertBefore($newInput, $responsesContainer);
		});

		$likeButton.addEventListener("click", (e) => {
			element.likes++;
			$likeButton.textContent = `${
				element.likes > 0 ? element.likes : ""
			} Likes`;
		});

		const $content = document.createElement("p");
		$content.textContent = element.text;
		const $actions = document.createElement("div");

		$commentContainer.appendChild($content);
		$commentContainer.appendChild($actions);
		$actions.appendChild($replyButton);
		$actions.appendChild($likeButton);
		$commentContainer.appendChild($responsesContainer);

		if (element.responses.length > 0) {
			renderComments(element.responses, $responsesContainer);
		}
		parent.appendChild($commentContainer);
	});
};
