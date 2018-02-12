// classe VelovMap
class Map {
	constructor() {
		this.initMap();
		//this.loadStation();
		//this.setMarker();
		//this.setStations();
	}
	initMap() {
		this.map = new google.maps.Map(document.querySelector('#map'), { 
			zoom: 13,
			center:{lat: 45.763519, lng: 4.8469652 }
		});
		//console.log(this);
	}
}
class Marker extends Map {
	constructor() {
		super();
		//this.tabJson = [];
		this.icones();
		this.loadStation();
	}
	icones() {
		this.iconeVerte = {
  			url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  			size: new google.maps.Size(40,50),
  			origin: new google.maps.Point(0,0),
  			anchor: new google.maps.Point(0,20)
		},
		this.iconeRouge = {
  			url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  			size: new google.maps.Size(40,50),
  			origin: new google.maps.Point(0,0),
  			anchor: new google.maps.Point(0,20)
  		},
		this.iconeBleue = {
  			url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  			size: new google.maps.Size(40,50),
  			origin: new google.maps.Point(0,0),
  			anchor: new google.maps.Point(0,20)
  		};
	}
	loadStation() {
		//ajax
		console.log(this);
		this.xhr = new XMLHttpRequest();
		this.xhr.open('GET', 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=4fd36bf901d835d9bf90b74a5a41c9e4a52e8451', true);
		this.xhr.addEventListener('load', (e) => {
			if (this.xhr.readyState === 4 && (this.xhr.status === 200 || this.xhr.status === 0 /* Pour gérer en local la requête */)) {
				this.response = JSON.parse(this.xhr.responseText);
				this.tabJson = this.response;
			
				for (let i = 0; i < this.tabJson.length; i++) {
					this.data = this.tabJson[i].position;
					this.latLng = new google.maps.LatLng(this.data.lat, this.data.lng);
					if (this.tabJson[i].available_bikes >= 1 && this.tabJson[i].status =='OPEN') {
						this.marker = new google.maps.Marker({
							position: this.latLng,
							map: this.map,
							icon: this.iconeVerte,
							title: this.tabJson[i].name 
						});
			  		} else if (this.tabJson[i].available_bike_stands <= this.tabJson[i].bike_stands && this.tabJson[i].available_bike_stands >= 1) {
			  			this.marker = new google.maps.Marker({
							position: this.latLng,
							map: this.map,
							icon: this.iconeBleue,
							title: this.tabJson[i].name 
						});
			  		} else if (this.tabJson[i].status =='CLOSED') {
			  			this.marker = new google.maps.Marker({
							position: this.latLng,
							map: this.map,
							icon: this.iconeRouge,
							title: this.tabJson[i].name 
						});
			  		} 
					
					this.marker.addListener('click', () => {
						if (this.tabJson[i].available_bikes >= 1) {
					  		//document.getElementById('formulaire');
						  	//this.divInfosStation.style.display = 'block';
						  	console.log(this);
						  	document.getElementById('formulaire').innerHTML = `
					  			<h1 class="pt-5">Informations station</h1>
						  		<p>${this.response[i].name} ${this.response[i].address}</p>
						  		<p><strong>Nombre de places de vélos au total</strong> : <em class="em1">${this.response[i].bike_stands}</em></p> 
					        	<p><strong>Nombre de places vides pour vélos</strong> : <em class="em2">${this.response[i].available_bike_stands}</em></p>
					        	<p><strong>Nombre de Vélos disponibles</strong> : <em class="em3">${this.response[i].available_bikes}</em></p>
					        	<input class="btn btn-secondary btn-block col-lg-8 form-control" type="submit" id="btn_reserver" value="Réservez"> `;
				        	// Gestion du bouton "Réservez" renvoyant sur le formulaire pour réserver
				        	//const boutonResa = document.getElementById('btn_reserver');
				   			document.getElementById('btn_reserver').addEventListener('click', (e) => {
						    	//const divInfosStation = document.getElementById('formulaire');
						    	//const divResaStation = this.divInfosStation;
							   	document.getElementById('formulaire').innerHTML = `
							   	<form id="myForm">
									<div class="form-group">
										<h1>Votre réservation</h1>
										<p><em><strong>A la station ${this.response[i].name}.</strong>Une fois le vélo réservé, vous avez 20 minutes pour le récupérer.</em></p>
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
								this.resaDefinitive.addEventListener('input', (e) => {
									sessionStorage.setItem('nom', document.getElementById('formGroupExampleInput').value);
							  		sessionStorage.getItem('nom');
							  	
									  	const resaDefinitive2 = document.getElementById('formGroupExampleInput2');
										this.resaDefinitive2.addEventListener('input', (e) => {
											sessionStorage.setItem('mail', document.getElementById('formGroupExampleInput2').value);
									  		sessionStorage.getItem('mail');
							  	
									  			const btnResa = document.getElementById('btn_resa');
									  			this.btnResa.addEventListener('click', (e) => {
									  				e.preventDefault();
						  							return counter();
						  						});
					  					});
								});
								// Gestion du bouton "Effacez" pour supprimer la signature
							    const btn = document.getElementById('reset');
							    this.btn.addEventListener('click', (e) => {
							    	return signatureClear(),sessionStorage.clear();
							    });
								// Gestion de la signature dans le canvas
								const element = document.getElementById('signatureCanvas');
							    this.element.addEventListener('mousedown', (e) => {
							        return signatureCapture();
							    });
							});
				        // Pas de bouton de réservation s'il n'y plus de vélos dispos avec message 
					    } else if (this.tabJson[i].available_bikes === 0) {
				    		//const divInfosStation = document.getElementById('formulaire');
				    		//this.divInfosStation.style.display = 'block';
				    		document.getElementById('formulaire').innerHTML = `
				    		<h1 class="pt-5">Informations station</h1>
				    		<p>${this.response[i].name} ${this.response[i].address} </p>
				    		<p><strong>Nombre de places de vélos au total</strong> : <em class="em1">${this.response[i].bike_stands}</em></p> 
					        <p><strong>Nombre de places vides pour vélos</strong> : <em class="em2">${this.response[i].available_bike_stands}</em></p>
					        <p><strong>Nombre de Vélos disponibles</strong> : <em class="em3">${this.response[i].available_bikes}</em></p>
					        <h3 id="messageAlerte">Vous ne pouvez pas réserver de vélo pour le moment. Merci pour votre compréhension.<h3>  `;
				    	} 
				    	console.log(this);
					});
					
					// En fonction du statut des stations les différentes icones
				}
			} else if (this.xhr.status != 200) { console.log('Impossible de contacter le serveur'); }
			console.log(this);
		});
		this.xhr.send(null);
  	}
	//}
}


