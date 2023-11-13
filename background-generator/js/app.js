//PALETA DE COLORES MEJORADA

const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

const boton = document.getElementById("generate");
const colorPrint = document.getElementById("color");
const Body = document.querySelector("body");

boton.addEventListener("click",function(){
    let hexColor = "#";

    for(let i = 0; i < 6; i++){

        hexColor += hex[getRandomNumber()];

    }

    colorPrint.innerHTML = hexColor;

    Body.style.backgroundColor = hexColor;

});

function getRandomNumber(){

    return Math.floor(Math.random() * hex.length);
    
}

//funcion para copia texto

document.getElementById("copy").addEventListener("click", function(){

    let text = document.getElementById("color").innerText;

    let textArea = document.createElement("textarea");

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();
    
    document.execCommand("copy");

    textArea.remove();

    alert("Texto copiado al portapapeles");

})