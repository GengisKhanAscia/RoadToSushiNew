"use strict";

const inputRicerca = document.getElementById("input_cerca");
const btnRicerca = document.getElementById("btn_cerca");
const piattoNoResult = document.getElementById("piatto_noresult");

let trovato;

btnRicerca.addEventListener("click", () => {

    trovato = false;
    const datoInput = inputRicerca.value.toUpperCase();
    const piatti = document.querySelectorAll('.piatto');
    
    piatti.forEach(function (piatto) {
        const nome = piatto.querySelector('.nome').innerHTML.toUpperCase();
        const ingredienti = piatto.querySelector('.ingredienti').innerHTML.toUpperCase();

        if(nome.includes(datoInput) || ingredienti.includes(datoInput)){
            piatto.removeAttribute("hidden");
            piatto.style.display = "block";
            trovato = true;
        }
        else{
            piatto.setAttribute("hidden", "");
        }
    });

    if(trovato){
        piattoNoResult.setAttribute("hidden", "");
    }
    else{
        piattoNoResult.removeAttribute("hidden");
    }
});