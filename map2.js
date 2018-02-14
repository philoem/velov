// classe VelovMap
class Map {
	constructor() {
		this.initMap();
	}
	initMap() {
		this.map = new google.maps.Map(document.querySelector('#map'), { 
			zoom: 13,
			center:{lat: 45.763519, lng: 4.8469652 }
		});
	}
}
class Marker extends Map {
	constructor() {
		super();
		this.s = 1201;// Temps correspondant à 20 minutes
		this.min = Math.floor(this.s / 60);
		this.sec = this.s % 60;
		this.timer = document.getElementById('piedPage');
		
		this.convertSeconds();
		this.icones();
		this.loadStation();
	}
	verifMail() {
		this.regexMail = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$");
		this.result = this.regexMail.test(sessionStorage.mail);
		if (this.result) {
			document.querySelector('#piedPage').innerHTML = `
				<h1 class="regexpTitleOk">Votre adresse mail est valide</h1>
			`;
		} else {
			document.querySelector('#piedPage').innerHTML = `
				<h1 class="regexpTitleNoOk">Votre adresse mail n'est pas valide</h1>
			`;
		}
	}
	// Pour le compte à rebours
	convertSeconds() {
		this.min = Math.floor(this.s / 60);
		if (this.min < 10) {
			this.min = '0' + this.min;
		}	
		this.sec = this.s % 60;
		if (this.sec < 10) {
			this.sec = '0' + this.sec;
		}
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
		this.xhr = new XMLHttpRequest();
		this.xhr.open('GET', 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=4fd36bf901d835d9bf90b74a5a41c9e4a52e8451', true);
		this.xhr.addEventListener('load', (e) => {
			if (this.xhr.readyState === 4 && (this.xhr.status === 200 || this.xhr.status === 0 /* Pour gérer en local la requête */)) {
				this.response = JSON.parse(this.xhr.responseText);
				this.tabJson = this.response;
				// Affichage des marqueurs avec leurs couleurs
				for (let i = 0; i < this.tabJson.length; i++) {
					this.data = this.tabJson[i].position;
					this.latLng = new google.maps.LatLng(this.data.lat, this.data.lng);
					if (this.tabJson[i].available_bikes >= 1 && this.tabJson[i].status =='OPEN') {
						this.marker = new google.maps.Marker({
							position: this.latLng,
							map: this.map,
							icon: this.iconeVerte,
							title: `${this.tabJson[i].name} ${this.tabJson[i].address}` 
						});
			  		} else if (this.tabJson[i].available_bike_stands <= this.tabJson[i].bike_stands && this.tabJson[i].available_bike_stands >= 1) {
			  			this.marker = new google.maps.Marker({
							position: this.latLng,
							map: this.map,
							icon: this.iconeBleue,
							title: `${this.tabJson[i].name} ${this.tabJson[i].address}` 
						});
			  		} else if (this.tabJson[i].status =='CLOSED') {
			  			this.marker = new google.maps.Marker({
							position: this.latLng,
							map: this.map,
							icon: this.iconeRouge,
							title: `${this.tabJson[i].name} ${this.tabJson[i].address}` 
						});
			  		} 
					// Gestion des événements sur les marqueurs avec l'affichage des formulaires
					this.marker.addListener('click', (e) => {
						if (this.tabJson[i].available_bikes >= 1) {
					  		document.querySelector('#formulaire').style.display = 'block';
						  	document.querySelector('#formulaire').innerHTML = `
					  			<h1 class="pt-5">Informations station</h1>
						  		<p>${this.response[i].name} ${this.response[i].address}</p>
						  		<p><strong>Nombre de places de vélos au total</strong> : <em class="em1">${this.response[i].bike_stands}</em></p> 
					        	<p><strong>Nombre de places vides pour vélos</strong> : <em class="em2">${this.response[i].available_bike_stands}</em></p>
					        	<p><strong>Nombre de Vélos disponibles</strong> : <em class="em3">${this.response[i].available_bikes}</em></p>
					        	<input class="btn btn-secondary btn-block col-lg-8 form-control" type="submit" id="btn_reserver" value="Réservez">
					        `;
				        	//console.log(this);
				        	// Gestion du bouton "Réservez" renvoyant sur le formulaire pour réserver
				   			document.querySelector('#btn_reserver').addEventListener('click', (e) => {
						    	document.querySelector('#formulaire').innerHTML = `
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
										    <canvas class="row col-xs-12" id="signatureCanvas">Ici votre signature</canvas><br>
										</div>
										<div class=" row justify-content-center">
											<button class="btn btn-primary btn-block col-lg-8 " type="reset" id="reset" value="">Effacez</button>
											<button class="btn btn-secondary btn-block col-lg-8 form-control " type="submit" id="btn_resa" value="">Réservez votre vélo</button>
										</div>
									</form>
								`;
								document.querySelector('#piedPage').innerHTML = `
									<h1>Veuillez entrer vos coordonnées</h1>
								`;
								
								// Gestion du clique du bouton "Réservez votre vélo"
								sessionStorage.clear();// Pour effacer les données enregistrées avant
								// Ici les 3 champs du formulaire de réservation
								document.querySelector('#formGroupExampleInput').addEventListener('input', (e) => {
									sessionStorage.setItem('nom', document.querySelector('#formGroupExampleInput').value);
							  		sessionStorage.getItem('nom');
							  	});
							  	document.querySelector('#formGroupExampleInput2').addEventListener('input', (e) => {
									sessionStorage.setItem('mail', document.querySelector('#formGroupExampleInput2').value);
							  		sessionStorage.getItem('mail');
							  	});
							  	document.querySelector('#signatureCanvas').addEventListener('click', (e) => {
									sessionStorage.setItem('sign', document.querySelector('#signatureCanvas').value);
							  		sessionStorage.getItem('sign');
							  		// Convertit la signature pour être stockée dans le sessionStorage
							  		window.sessionStorage.sign = document.querySelector('#signatureCanvas').toDataURL();
							  	});
					  			document.querySelector('#btn_resa').addEventListener('click', (e) => {
					  				e.preventDefault();
							  		// Ici vérification du format du mail
									this.verifMail();
					  				// Ici prénom, nom et signature obligatoire
					  				if (sessionStorage.nom != null && sessionStorage.sign != null) {
						  				this.s = 1201;	
			  							// Compte à rebours 20 min
		  								this.interval = setInterval(() => {
											this.s--;// Remets à 20 minutes le compte à rebours
											this.timer.innerHTML =` ${this.convertSeconds(this.s)} `;
											this.timer.innerHTML = ` 
												<p id="timer" class="justify-content-center col-xs-12"><em class="nameSignResa">${sessionStorage.getItem('nom')}</em>, il vous
												 reste <strong> ${this.min} : ${this.sec} </strong>  minutes pour récupérer votre vélo à la station
												 <em class="nameSignResa">${this.response[i].address}</em>.</p>
											`;
											if (this.s < 0) {
												this.timer.innerHTML =`<p id="timer" class="justify-content-center col-xs-12">Le temps de la réservation du vélo est dépassé !</p>`;
												clearInterval(this.interval);
											} 
										}, 1000);
									} else  { 
	  									document.querySelector('#piedPage').innerHTML = `
											<h1>Veuillez entrer vos coordonnées</h1>
										`;
	  								}
	  								return false;
								});
					  										
								// Gestion du bouton "Effacez" pour supprimer la signature
							    document.querySelector('#reset').addEventListener('click', (e) => {
							    	document.querySelector('#piedPage').innerHTML = `
										<h1>Veuillez entrer vos coordonnées</h1>
									`;
							    	return signatureClear(),sessionStorage.clear(), clearInterval(this.interval);
							    });
								// Gestion de la signature dans le canvas
								document.querySelector('#signatureCanvas').addEventListener('mousedown', (e) => {
							        return signatureCapture();
							    });
							});
				        // Pas de bouton de réservation s'il n'y plus de vélos dispos avec message 
					    } else if (this.tabJson[i].available_bikes === 0) {
				    		document.querySelector('#formulaire').style.display = 'block';
				    		document.querySelector('#formulaire').innerHTML = `
					    		<h1 class="pt-5">Informations station</h1>
					    		<p>${this.response[i].name} ${this.response[i].address} </p>
					    		<p><strong>Nombre de places de vélos au total</strong> : <em class="em1">${this.response[i].bike_stands}</em></p> 
						        <p><strong>Nombre de places vides pour vélos</strong> : <em class="em2">${this.response[i].available_bike_stands}</em></p>
						        <p><strong>Nombre de Vélos disponibles</strong> : <em class="em3">${this.response[i].available_bikes}</em></p>
						        <h3 id="messageAlerte">Vous ne pouvez pas réserver de vélo pour le moment. Merci pour votre compréhension.<h3>
					        `;
					        document.querySelector('#piedPage').innerHTML = `
								<h1 class="col-lg-12 col-xs-12"><strong>La ville de Lyon vous informe que le port du casque
								 à vélo est fortement recommandé en ville</strong></h1>
							`;
				    	} 
				    });
				}
			} else if (this.xhr.status != 200) { console.log('Impossible de contacter le serveur'); }
		});
		this.xhr.send(null);
  	}
}



