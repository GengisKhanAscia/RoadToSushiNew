"use strict";

/*NAVBAR*/
let menu = document.getElementById("menu_uniforme");

const x = `
    
<!-- MENU DI NAVIGAZIONE -->
<nav class="navbar navbar-expand-xl navbar-dark bg-dark fixed-top menu_normale" id="menuX">
    <div class="container-fluid">
      <a class="navbar-brand" href="home.html">
           <img src="/images/sushiNavbar.png" alt="Logo RoadToSushi" height="100">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 menu_centrato" id="elementi">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="home.html#">Home</a>
          </li>
          <li class="nav-item" id="tari">
              <a class="nav-link" href="#tariffario_modal" data-toggle="modal" data-target="#tariffario_modal">Offerte</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#orari_modal" data-toggle="modal" data-target="#orari_modal" id="men_orari" onClick="giorno_ora();">Orari</a>
          </li>
          <li class="nav-item" id="cont">
              <a class="nav-link" href="contatti.html">Contatti</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="personale.html#" id="dips" >Personale</a>
          </li>

          <!-- COMMENTO -->
          <li class="nav-item">
            <a class="nav-link" href="#reg_modal" data-toggle="modal" data-target="#reg_modal">Registrati</a>
          </li>

          <!-- SCOMMENTO -->
          <!--
          <li class="nav-item">
            <a class="nav-link" href="#">Login</a>
          </li>
          -->

          <!-- PROVA -->
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="login.html#">Login</a>
          </li>
          
          <script>
            let log = document.getEle
          </script>
          <!-- esempio di voce di menù disabilitata
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
          -->
        </ul>
        <form class="d-flex" id="form_cerca" action="personale.html">
          <input class="form-control me-2" type="search" placeholder="Cerca tra i piatti..." id="cerca_dip" name="cerca_dip" aria-label="Cerca tra i piatti...">
          <button class="btn btn-outline-success" id="btn_cerca" type="submit">Cerca</button>
        </form>
      </div>
    </div>
  </nav>

`;
menu.innerHTML += x;

/*FOOTER*/
let footer = document.getElementById("foot");

const y = `

<!-- BARRA A PIE' DI PAGINA -->
        <table class="footersocial">
         <tr>
          <td><a class="footer nav-link active" aria-current="page" target="_blank" href="https://www.instagram.com/shabunovara/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg> </a></td>
           <td> <a class="footer nav-link active" aria-current="page" target="_blank" href="https://shabunovara.it/"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
          </svg></a></td>
         <td>   <a class="footer nav-link active" aria-current="page" target="_blank" href="https://www.facebook.com/shabunovara/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
        </svg> </a></td>
        </tr> 
        </table> 

        <div class="bg-dark text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        RoadToSushi Network ©2022 <i>All rights reserved.</i>
        </div>
`;

footer.innerHTML += y;

/*
(async function(){
  let log = document.getElementById("elementi");
  let logged_cli = await fetch('/loggato_cli');
  let logged_dip = await fetch('/loggato_dip');
  const lpjson = await logged_cli.json();
  const lmjson = await logged_dip.json();
  let m;
  //alert(lpjson.log) //mio debug
  if(!lmjson.log && !lpjson.log){ //l'utente non è loggato, navbar classica
    m = `
                <li class="nav-item">
                    <a class="nav-link" href="#reg_modal" data-toggle="modal" data-target="#reg_modal">Registrati</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
    `;
    log.innerHTML += m;
  }
    else if(lmjson.log){ //utente loggato come dipendente (personale)
      m = `
                  <li class="nav-item">
                      <a class="nav-link" href="dipdispo.html">Vedi richieste</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="myserDip.html">I miei Servizi</a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="/logout" id="ilnome">Logout</a>
                  </li>
      `;
      log.innerHTML += m;
      document.getElementById("tari").remove();

      if(window.location.href.includes("servizi.html")){
        document.getElementsByTagName("h3")[0].innerText = "QUESTI SONO I SERVIZI RICHIESTI";
        document.getElementById("title").remove();
      }

     
      let ilnome = await fetch('/loggato_dip_nome');
      const json = await ilnome.json();
      document.getElementById("ilnome").innerText = "Logout [Dip: " + json.ilnome + "]";
    }
      else if(lpjson.log){ //utente loggato come cli
        m = `
          <li class="nav-item">
             <a class="nav-link" href="lavora.html">Lavora con noi</a>
           </li>
            <li class="nav-item">
            <a class="nav-link" href="richiedi.html">Richiedi</a>
             </li>
            <li class="nav-item">
                <a class="nav-link" href="myserCli.html">Le mie richieste</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/logout" id="ilnome">Logout</a>
            </li>
        `;
        log.innerHTML += m;
        //ottengo il nome e lo scrivo di fianco a logout
        let ilnome = await fetch('/loggato_cli_nome');
        const json = await ilnome.json();
        document.getElementById("ilnome").innerText = "Logout [utente: " + json.ilnome + "]";
      }
})();
*/