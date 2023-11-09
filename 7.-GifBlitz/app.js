window.addEventListener("DOMContentLoaded", function(){
  const apiKey = 'k4rGhQpfhNl03KYzmat7BtQqPX0HtXqV';
  const searchTerm = "anime"; // Término de búsqueda
  
  fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`)
    .then(response => {
      if(!response.ok) throw new Error("Fallo al recibir API GIPHY");
      return response.json();
    })
    .then(data => {
      const gifContainer = document.getElementById('gifContainer');
      gifContainer.innerHTML = "";

      if(data && data.data && data.data.length > 0){
        data.data.forEach(gif => {
          const contentGiphy = document.createElement("article");
          contentGiphy.classList.add("container-img")
          const giphy = document.createElement("img");
          contentGiphy.appendChild(giphy);
          giphy.src = gif.images.fixed_height.url;
          gifContainer.appendChild(contentGiphy);
        })
      }else{
        console.error("Error al buscar GIFS")
      }
    })
    .catch(error => console.error(`Error al buscar GIFs: ${error}}`))
})

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const category = document.querySelector(".category");
  const $input = document.getElementById("input-gif").value;
  const apiKey = 'k4rGhQpfhNl03KYzmat7BtQqPX0HtXqV';
  const searchTerm = $input; // Término de búsqueda
  category.innerHTML = `Categoria: ${$input}`;
  
  if($input === "") category.innerHTML = "no se encontraron resultados"

  fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}`)
    .then(response => {
      if(!response.ok) throw new Error("Fallo al recibir API GIPHY");
      return response.json();
    })
    .then(data => {
      const gifContainer = document.getElementById('gifContainer');
      gifContainer.innerHTML = "";

      if(data && data.data && data.data.length > 0){
        data.data.forEach(gif => {
          const contentGiphy = document.createElement("article");
          contentGiphy.setAttribute("class","container-img")
          gifContainer.appendChild(contentGiphy);
          
          const giphy = document.createElement("img");
          giphy.setAttribute("class","giphy-img");
          giphy.setAttribute("src",gif.images.fixed_height.url);
          giphy.setAttribute("alt", "Descripción de la imagen");
          contentGiphy.appendChild(giphy);
        })
      }else{
        console.error("Error al buscar GIFS")
      }
    })
    .catch(error => console.error(`Error al buscar GIFs: ${error}}`))
})
