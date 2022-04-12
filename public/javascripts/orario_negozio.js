"use strict";

function giorno_ora(){
    moment.locale('it');
    const qui_moment = document.getElementById("qui_moment");
    qui_moment.innerHTML = ''; // per resettarlo
    qui_moment.innerHTML += 'Oggi &egrave; ';
    qui_moment.innerHTML += moment().format("dddd");
    qui_moment.innerHTML += ' e sono le ore ';
    qui_moment.innerHTML += moment().format("H:mm");

    const open_close = document.getElementById("open_close");
    open_close.innerHTML = ''; // per resettarlo
    
   const giorno = moment().day();
   const ora = moment().hours();
   const minuti = moment().minutes();
   switch(giorno){
       // Moment.js conta da 0 (Domenica) a 6 (Sabato)
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            if((ora>=12&&ora<=15) || (ora>=19&&ora<=22))
                open_close.innerHTML = "APERTO";
            else
                open_close.innerHTML = "CHIUSO";
            break;
        default:
            break;
   }
}