"use strict";

/*
(function (){
  // Prendo eventuali parametri dall'URL e li mostro(es. messaggi di errore)
    let currentUrl = new URL(window.location.href);
    // console.log(currentUrl);
    let getErrore = currentUrl.searchParams.get('errore');
    if(getErrore != null){
      if(getErrore.includes("successo")){                                           // Messaggio di registrazione avvenuta con successo; di colore verde
        document.getElementById("errore_msg").className = "errore_msg_successo";
        document.getElementById("errore_msg").innerHTML = "Registrazione avvenuta con successo! Corri a loggarti.";
      }
      else{
        document.getElementById("errore_msg").className = "errore_msg";
        document.getElementById("errore_msg").innerHTML = "Errore: ";
        document.getElementById("errore_msg").innerHTML += getErrore;
      }
    }
})();


// Per non farlo inviare prima che sia tutto a posto
(function () {
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })();
  */

// INUTILIZZATO AL MOMENTO 
/*
// Per impostare la max date a oggi, nel form
(function () {
  if(window.location.href.includes("reg")){ // Solo se sono in REGISTRAZIONE
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; 
    let yyyy = today.getFullYear() - 18; // Perché devi avere almeno 18 anni
    if(dd < 10){
        dd = '0' + dd
    } 
    if(mm < 10){
        mm = '0' + mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("dn").setAttribute("max", today);  
    }else if(window.location.href.includes("richiedi")){ // sono in prenota servizi, la data deve essere successiva a quella attuale (odierna)
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; 
        let yyyy = today.getFullYear();
        if(dd < 10){
            dd = '0'+ dd
        } 
        if(mm < 10){
            mm = '0' + mm
        } 
        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("dv").setAttribute("min", today);
    }
})();
*/

/*
// Per evitare che si mostri il form di login/registrazione ad utenti già loggati
(function (){
  if(window.location.href.includes("log") || window.location.href.includes("reg")){
      let lpjson;
      let lmjson;
      (async function(){
          let logged_cli = await fetch('/loggato_cli');
          let logged_dip = await fetch('/loggato_dip');
          lpjson = await logged_cli.json();
          lmjson = await logged_dip.json();
      })().then( () => {
          if(lpjson.log || lmjson.log) // L'UTENTE è loggato (non mi interessa il tipo_utente) --> Non deve visualizzare il form di login/registrazione
            {
                let main = document.getElementsByTagName("main")[0];
                main.innerHTML = "<h5 class='hspace'>&nbsp</h5><h5 class='hspace'> Sei gi&agrave; loggato correttamente! </h5><a href='home.html' class='nodecor'>Torna alla homepage</a>";
            }
            // POSSO RIMUOVERE QUESTO RAMO
            else {
              // Non faccio nulla
            }
      });
    }
    if(window.location.href.includes("dipdispo")){ // Sono in disponibilità servizi
        let lmjson;
        (async function(){
            let logged_dip = await fetch('/loggato_dip');
            lmjson = await logged_dip.json();
        })().then( () => {
            if(lmjson.log) // L'utente è loggato come PERSONALE, può allora accedere a questa pagina 
            {
                // Non faccio nulla [POSSO RIMUOVERE QUESTO RAMO / SWITCHARE LA CONDIZIONE]
            }
            else { // Altrimenti no e glielo vieto
                let main = document.getElementsByTagName("main")[0];
                main.innerHTML = "<h5 class='hspace'>&nbsp</h5><h5 class='hspace'> Pagina riservata al personale loggato correttamente </h5><a href='home.html' class='nodecor'>Torna alla homepage</a>";
            }
        });
    }
})();
*/