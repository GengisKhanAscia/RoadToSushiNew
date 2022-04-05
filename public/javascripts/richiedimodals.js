"use strict";

let mod = document.getElementById("modals_uniformi");

const plus = `
   
<!-- OFFERTE (nascosto all'inizio) -->
	<div class="modal fade" id="tariffario_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"> OFFERTE DI FEBBRAIO 2022</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<table class="table modals_stile">
					<thead class="modals_head black_head">
					<tr>
						<th scope="col">Tipologia Box</th>
					    <th scope="col">Composizione</th>
						<th scope="col">Prezzo</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>Piccola</td>
                        <td>1 sushi &amp; 1 caldo</td>
						<td>10&euro;</td>
					</tr>
					<tr>
						<td>Media</td>
                        <td>2 sushi &amp; 2 caldi</td>
						<td>18&euro;</td>
					</tr>
					<tr>
						<td>Grande</td>
                        <td>3 sushi &amp; 3 caldi</td>
						<td>25&euro;</td>
					</tr>
			
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary close chiudi_btn" data-dismiss="modal">Chiudi</button>
			</div>
			</div>
		</div>
	</div>

<!-- ORARI (nascosti all'inizio) -->
	<div class="modal fade" id="orari_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="h5right"> ORARI DI APERTURA </h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<table class="table modals_stile">
					<thead class="modals_head black_head">
					<tr>
						<th scope="col">Giorno</th>
						<th scope="col">Pranzo</th>
                        <th scope="col">Cena</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<strong><td>Luned&igrave;</td></strong>
						<td>12:00 - 15:00</td>
                        <td>19:00 - 22:00</td>
						</tr>
					<tr>
						<strong><td>Marted&igrave;</td></strong>
						<td>12:00 - 15:00</td>
                        <td>19:00 - 22:00</td>
					</tr>
					<tr>
						<strong><td>Mercoled&igrave;</td></strong>
						<td>12:00 - 15:00</td>
                        <td>19:00 - 22:00</td>
					</tr>
					<tr>
						<strong><td>Gioved&igrave;</td></strong>
						<td>12:00 - 15:00</td>
                        <td>19:00 - 22:00</td>
					</tr>
					<tr>
						<strong><td>Venerd&igrave;</td></strong>
						<td>12:00 - 15:00</td>
                        <td>19:00 - 22:00</td>
					</tr>
					<tr>
						<strong><td>Sabato</td></strong>
						<td>12:00 - 15:00</td>
                        <td>19:00 - 22:00</td>
						</tr>
					<tr>
						<strong><td>Domenica</td></strong>
						<td>12:00 - 15:00</td>
                        <td>19:00 - 22:00</td>
					</tr>
					</tbody>
				</table>
				<!--qui c'è del js-->
				<font color="black"><h5 class="hcenter" id="qui_moment"></h5></font>
				<font color="black"><h5 class="hcenter" id="open_close"></h5></font>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary close chiudi_btn" data-dismiss="modal">Chiudi</button>
			</div>
			</div>
		</div>
	</div>

	<!-- REGISTRAZIONE (nascosto all'inizio) -->
	<div class="modal fade" id="reg_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"> PERSONALE o CLIENTE? </h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
			</div>

			<div class="modal-body divcentrato">
				<a href="regPersonale.html"><button type="button" class="btn btn-primary close color_btn">PERSONALE</button></a>
				<a href="regCliente.html"><button type="button" class="btn btn-primary close color_btn">CLIENTE</button></a>
			</div>

			</div>
		</div>
	</div>

    `;

    mod.innerHTML += plus;