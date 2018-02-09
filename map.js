/* MAP */
// Initialisation de la carte de Lyon
function initMap() {
	const lyon = {lat: 45.763519, lng: 4.8469652};
	const map = new google.maps.Map(document.getElementById('map'), {
	    	zoom: 13,
		    center: lyon
	});
	// Importation des données en temps réelles JC Decaux sur la carte
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=4fd36bf901d835d9bf90b74a5a41c9e4a52e8451', true);
		
	xhr.addEventListener('load', function(e) {
		if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0 /* Pour gérer en local la requête */)) {
			const response = JSON.parse(xhr.responseText);
			const tabJson = response;
			// Ajouts de marqueurs
			for (let i = 0; i < tabJson.length; i++) {
			  	const data = tabJson[i].position,
			  	latLng = new google.maps.LatLng(data.lat, data.lng); 
			  	// Création de marqueur avec la position des stations
			  	function icones() {
			  		const iconeVerte = {
			  			url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
			  			size: new google.maps.Size(40,50),
			  			origin: new google.maps.Point(0,0),
			  			anchor: new google.maps.Point(0,20)
			  		};
			  		const iconeRouge = {
			  			url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
			  			size: new google.maps.Size(40,50),
			  			origin: new google.maps.Point(0,0),
			  			anchor: new google.maps.Point(0,20)
			  		};
			  		const iconeBleue = {
			  			url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			  			size: new google.maps.Size(40,50),
			  			origin: new google.maps.Point(0,0),
			  			anchor: new google.maps.Point(0,20)
			  		};
			  	 	if (tabJson[i].available_bikes >= 1 && tabJson[i].status =='OPEN') {
			  			return iconeVerte;
			  		} else if (tabJson[i].available_bike_stands <= tabJson[i].bike_stands && tabJson[i].available_bike_stands >= 1) {
			  			return iconeBleue;
			  		} else if (tabJson[i].status =='CLOSED') {
			  			return iconeRouge;
			  		} 
		  		}

			  	const marker = new google.maps.Marker({
				    position: latLng,
				    map: map,
				    icon: icones(),
				    title: tabJson[i].name
			  	});
			  	// Gestion du clique de la souris avec l'apparition du formulaire d'infos de la station cliquée sur la carte
			  	marker.addListener('click', function() {
			  		if (tabJson[i].available_bikes >= 1) {
				  		const divInfosStation = document.getElementById('formulaire');
					  	divInfosStation.style.display = 'block';
					  	divInfosStation.innerHTML = `
				  			<h1 class="pt-5">Informations station</h1>
					  		<p>${response[i].name} ${response[i].address}</p>
					  		<p><strong>Nombre de places de vélos au total</strong> : <em class="em1">${response[i].bike_stands}</em></p> 
				        	<p><strong>Nombre de places vides pour vélos</strong> : <em class="em2">${response[i].available_bike_stands}</em></p>
				        	<p><strong>Nombre de Vélos disponibles</strong> : <em class="em3">${response[i].available_bikes}</em></p>
				        	<input class="btn btn-secondary btn-block col-lg-8 form-control" type="submit" id="btn_reserver" value="Réservez"> `;
			        	// Gestion du bouton "Réservez" renvoyant sur le formulaire pour réserver
			        	const boutonResa = document.getElementById('btn_reserver');
			   			boutonResa.addEventListener('click', function(e) {
					    	const divInfosStation = document.getElementById('formulaire');
					    	const divResaStation = divInfosStation;
						   	divResaStation.innerHTML = `
						   	<form id="myForm">
								<div class="form-group">
									<h1>Votre réservation</h1>
									<p><em><strong>A la station ${response[i].name}.</strong>Une fois le vélo réservé, vous avez 20 minutes pour le récupérer.</em></p>
								    <label for="formGroupExampleInput"><strong>Veuillez indiquer votre prénom et nom</strong></label>
								    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="prénom nom" required>
								</div>
								<div class="form-group">
								    <label for="formGroupExampleInput2"><strong>Votre adresse mail</strong></label>
								    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="name@example.com">
								    <label for="formGroupExampleInput3"><strong>Ici votre signature</strong></label>
								    <canvas class="col-lg-10" id="signatureCanvas">Ici votre signature</canvas><br>
								</div>
								<div class=" row justify-content-center">
									<button class="btn btn-primary btn-block col-lg-8 " type="reset" id="reset" value="">Effacez</button>
									<button class="btn btn-secondary btn-block col-lg-8 form-control " type="submit" id="btn_resa" value="">Réservez votre vélo</button>
								</div>
							</form> `;
							
							// Gestion du clique du bouton "Réservez votre vélo"
							sessionStorage.clear();// Pour effacer les données enregistrées avant
							const resaDefinitive = document.getElementById('formGroupExampleInput');
							resaDefinitive.addEventListener('input', function(e) {
								sessionStorage.setItem('nom', document.getElementById('formGroupExampleInput').value);
						  		sessionStorage.getItem('nom');
						  	
								  	const resaDefinitive2 = document.getElementById('formGroupExampleInput2');
									resaDefinitive2.addEventListener('input', function(e) {
										sessionStorage.setItem('mail', document.getElementById('formGroupExampleInput2').value);
								  		sessionStorage.getItem('mail');
						  	
								  			const btnResa = document.getElementById('btn_resa');
								  			btnResa.addEventListener('click', function(e) {
								  				e.preventDefault();
					  							return counter();
					  						});
				  					});
							});
							// Gestion du bouton "Effacez" pour supprimer la signature
						    const btn = document.getElementById('reset');
						    btn.addEventListener('click', function(e) {
						    	return signatureClear(), eraseResa();
						    });
							// Gestion de la signature dans le canvas
							const element = document.getElementById('signatureCanvas');
						    element.addEventListener('mousedown', function(e) {
						        return signatureCapture();
						    });
						    
						});
			        // Pas de bouton de réservation s'il n'y plus de vélos dispos avec message 
				    } else if (tabJson[i].available_bikes === 0) {
			    		const divInfosStation = document.getElementById('formulaire');
			    		divInfosStation.style.display = 'block';
			    		divInfosStation.innerHTML = `
			    		<h1 class="pt-5">Informations station</h1>
			    		<p>${response[i].name} ${response[i].address} </p>
			    		<p><strong>Nombre de places de vélos au total</strong> : <em class="em1">${response[i].bike_stands}</em></p> 
				        <p><strong>Nombre de places vides pour vélos</strong> : <em class="em2">${response[i].available_bike_stands}</em></p>
				        <p><strong>Nombre de Vélos disponibles</strong> : <em class="em3">${response[i].available_bikes}</em></p>
				        <h3 id="messageAlerte">Vous ne pouvez pas réserver de vélo pour le moment. Merci pour votre compréhension.<h3>  `;
			    	} 
				});
			}

		} else if (xhr.status != 200) { alert('Impossible de contacter le serveur'); }
	
	});
	xhr.send(null);


}




