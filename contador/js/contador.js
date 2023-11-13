let contador = 0;

document.getElementById("decrease").addEventListener("click", decremento);


function decremento (){
    contador--;
    
    document.getElementById("number").innerHTML = contador;
    
    if(contador < 0){
        
        document.getElementById("number").style.color = "red";

    }
}


document.getElementById("increase").addEventListener("click", incremento);

function incremento (){
    
    contador++;
    
    document.getElementById("number").innerHTML = contador;

    if(contador > 0){
        
        document.getElementById("number").style.color = "green";

    }

}

document.getElementById("reset").addEventListener("click",resetear);

function resetear (){

    contador = 0;
    
    document.getElementById("number").innerHTML = contador;

    if(contador === 0){
        
        document.getElementById("number").style.color = "#12232F";

    }

}






