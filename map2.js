/*--------------------------------------------*
|		DWJ - Projet 3 - OpenClassRoom 		  |			
|			  Philippe Chamard			      |
|		    Réalisé en février 2018			  |
*---------------------------------------------*/
/* Vélo'V - Réservations de vélos dans différentes stations de la ville de Lyon */
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
		this.s = 1201;// Temps en secondes correspondant à 20 minutes
		this.min = Math.floor(this.s / 60);
		this.sec = this.s % 60;
		this.minx = sessionStorage.getItem('minutes')* 60;
		this.secx = parseInt(sessionStorage.getItem('secondes'));
		this.s2 = (this.minx + this.secx);
		this.min2 = Math.floor(this.s2 / 60);
		this.sec2 = this.s2 % 60;
		this.formulaire = document.querySelector('#formulaire');
		this.piedPage = document.querySelector('#piedPage');
		this.nomRecup = sessionStorage.getItem('nom');
		this.stationStocked = sessionStorage.getItem('station');
		
		this.recupData();
		this.icones();
		this.loadStation();
	}
	// Ici suppression des données dans le sessionStorage en ne laissant que celle de la station
	removeData() {
		return sessionStorage.removeItem('nom'), sessionStorage.removeItem('minutes'), sessionStorage.removeItem('secondes'), sessionStorage.removeItem('sign'), sessionStorage.removeItem('mail');
	}
	// Ici méthodes affichages messages dans le footer
	msgPutName() {
		this.piedPage.innerHTML = `
			<h1>Veuillez entrer vos coordonnées ou sélectionner une station</h1>
		`;
	}
	msgChronoIsOver() {
		this.piedPage.innerHTML =`
			<p id="timer" class="justify-content-center col-xs-12">Le temps de la réservation du vélo est dépassé !</p>
		`;
	}
	msgPortCasque() {
		this.piedPage.innerHTML = `
			<h1 class="col-lg-12 col-xs-12"><strong>La ville de Lyon vous informe que le port du casque
			 à vélo est fortement recommandé en ville</strong></h1>
		`;
	}
	// Récupération du compte à rebours avec les données stockées dans le sessionStorage
	recupData() {
		if (this.nomRecup != null && this.stationStocked != null) {
			this.interval2 = setInterval( () => {
				this.s2--;
				this.piedPage.innerHTML =` ${this.convertSeconds2(this.s2)} `;
				this.piedPage.innerHTML = ` 
					<p id="timer" class="justify-content-center col-xs-12"><em class="nameSignResa">${this.nomRecup}</em>, il vous
					 reste <span id="minutes"><strong> ${this.min2}</strong></span> : <span id="secondes"><strong>${this.sec2} </strong></span> 
					  minutes pour récupérer votre vélo à la station
					 <em class="nameSignResa">${this.stationStocked}</em>.</p>
				`;
				if (this.s2 === 0) {
					this.msgChronoIsOver();
					clearInterval(this.interval2);
				}
				sessionStorage.setItem('minutes', this.min2);
				sessionStorage.setItem('secondes', this.sec2);
			}, 1000);
		} else {
			return this.msgPortCasque();
		}
	}
	// Compte à rebours
	countDown() {
		this.s = 1201;
		if (sessionStorage.minutes === 0 || sessionStorage.minutes == null && sessionStorage.secondes === 0 || sessionStorage.secondes == null) {
			this.interval = setInterval( () => {
				this.s--;
				this.piedPage.innerHTML =` ${this.convertSeconds(this.s)} `;
				this.piedPage.innerHTML = ` 
					<p id="timer" class="justify-content-center col-xs-12"><em class="nameSignResa">${sessionStorage.getItem('nom')}</em>, il vous
					 reste <span id="minutes"><strong> ${this.min}</strong></span> : <span id="secondes"><strong>${this.sec} </strong></span> 
					  minutes pour récupérer votre vélo à la station
					 <em class="nameSignResa">${sessionStorage.getItem('station')}</em>.</p>
				`;
				if (this.s === 0) {
					this.msgChronoIsOver();
					clearInterval(this.interval);
				} 
				// Compte à rebours dans sessionStorage
				sessionStorage.setItem('minutes', this.min);
				sessionStorage.setItem('secondes', this.sec);
			}, 1000);
			//location.reload();
		}
	}
	// Pour le compte à rebours initial
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
	// Pour le compte à rebours après rechargement de la page
	convertSeconds2() {
		this.min2 = Math.floor(this.s2 / 60);
		if (this.min2 < 10) {
			this.min2 = '0' + this.min2;
		}	
		this.sec2 = this.s2 % 60;
		if (this.sec2 < 10) {
			this.sec2 = '0' + this.sec2;
		}
	}
	verifMail() {
		this.regexMail = new RegExp("^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$");
		this.result = this.regexMail.test(sessionStorage.mail);
		if (this.result) {
			this.piedPage.innerHTML = `
				<h1 class="regexpTitleOk">Votre adresse mail est valide</h1>
			`;
		} else {
			this.piedPage.innerHTML = `
				<h1 class="regexpTitleNoOk">Votre adresse mail n'est pas valide</h1>
			`;
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
						sessionStorage.removeItem('minutes'), sessionStorage.removeItem('secondes');
						// Stockage de l'adresse de la station
						sessionStorage.setItem('station', this.response[i].name);
						if (this.tabJson[i].available_bikes >= 1) {
					  		this.formulaire.style.display = 'block';
					  		this.formulaire.innerHTML = `
					  			<h1 class="pt-5">Informations station</h1>
						  		<p>${this.response[i].name} ${this.response[i].address}</p>
						  		<p><strong>Nombre de places de vélos au total</strong> : <em class="em1">${this.response[i].bike_stands}</em></p> 
					        	<p><strong>Nombre de places vides pour vélos</strong> : <em class="em2">${this.response[i].available_bike_stands}</em></p>
					        	<p><strong>Nombre de Vélos disponibles</strong> : <em class="em3">${this.response[i].available_bikes}</em></p>
					        	<input class="btn btn-primary btn-block col-lg-8 form-control" type="submit" id="btn_reserver" value="Réservez">
					        `;
							this.msgPortCasque();
				        	// Gestion du bouton "Réservez" renvoyant sur le formulaire pour réserver
				   			document.querySelector('#btn_reserver').addEventListener('click', (e) => {
						    	// Le compte à rebours s'arrête quand on clique sur "Réserver"
						    	clearInterval(this.interval);
						    	clearInterval(this.interval2);
						    	this.removeData();
						    	this.formulaire.innerHTML = `
								   	<form id="myForm">
										<div class="form-group">
											<h2>Votre réservation</h2>
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
											<button class="btn btn-secondary btn-block col-xs-8 col-lg-8 " type="reset" id="reset" value="">Effacez</button>
											<button class="btn btn-primary btn-block col-xs-8 col-lg-8 form-control " type="submit" id="btn_resa" value="">Réservez votre vélo</button>
										</div>
									</form>
								`;
								this.msgPutName();
								// Ici la signature dans le canvas
			  					signatureCapture();
								// Ici les données stockées dans sessionStorage
								document.querySelector('#formGroupExampleInput').addEventListener('input', (e) => {
									sessionStorage.setItem('nom', document.querySelector('#formGroupExampleInput').value);
							  	});
							  	document.querySelector('#formGroupExampleInput2').addEventListener('input', (e) => {
									sessionStorage.setItem('mail', document.querySelector('#formGroupExampleInput2').value);
							  	});
							  	document.querySelector('#signatureCanvas').addEventListener('click', (e) => {
									sessionStorage.setItem('sign', document.querySelector('#signatureCanvas').value);
							  		// Convertit la signature pour être stockée dans le sessionStorage
							  		window.sessionStorage.sign = document.querySelector('#signatureCanvas').toDataURL();
							  		// Ici vérification du format du mail
									this.verifMail();
							  	});
							  	// Ici enregistrement de la signature dans le sessionStorage via l'événement "touchstart"
							  	document.querySelector('#signatureCanvas').addEventListener('touchstart', (e) => {
									sessionStorage.setItem('sign', document.querySelector('#signatureCanvas').value);
							  		// Convertit la signature pour être stockée dans le sessionStorage
							  		window.sessionStorage.sign = document.querySelector('#signatureCanvas').toDataURL();
							  		// Ici vérification du format du mail
									this.verifMail();
							  	});
								// Gestion du bouton "Réservez votre vélo"
					  			document.querySelector('#btn_resa').addEventListener('click', (e) => {
					  				e.preventDefault();// Evite le rafraîchissement de la page
									clearInterval(this.interval);// Ici stoppe le chrono qui se répète autant de fois que l'on déclenche le bouton réservation
					  				// Ici prénom, nom et signature obligatoire
					  				if (sessionStorage.nom != null && sessionStorage.sign != null && sessionStorage.station != null) {
					  					// Compte à rebours
					  					this.countDown();
					  				} else  { 
	  									this.msgPutName();
	  								}
								});
								// Gestion du bouton "Effacez" 
							    document.querySelector('#reset').addEventListener('click', (e) => {
							    	this.msgPutName();
							    	this.removeData();
							    	return signatureClear(), clearInterval(this.interval), clearInterval(this.interval2);
							    });
							});
				        // Pas de bouton de réservation s'il n'y plus de vélos dispos, avec message dans le footer
					    } else if (this.tabJson[i].available_bikes === 0) {
				    		this.formulaire.style.display = 'block';
				    		this.formulaire.innerHTML = `
					    		<h1 class="pt-5">Informations station</h1>
					    		<p>${this.response[i].name} ${this.response[i].address} </p>
					    		<p><strong>Nombre de places de vélos au total</strong> : <em class="em1">${this.response[i].bike_stands}</em></p> 
						        <p><strong>Nombre de places vides pour vélos</strong> : <em class="em2">${this.response[i].available_bike_stands}</em></p>
						        <p><strong>Nombre de Vélos disponibles</strong> : <em class="em3">${this.response[i].available_bikes}</em></p>
						        <h3 id="messageAlerte">Vous ne pouvez pas réserver de vélo pour le moment. Merci pour votre compréhension.<h3>
					        `;
					        this.msgPortCasque();
				    	} 
				    });
				}
			} else if (this.xhr.status != 200) { console.log('Impossible de contacter le serveur'); }
		});
		this.xhr.send(null);
  	}
}



