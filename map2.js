// classe map

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
class Markers extends Map {
	constructor(marker) {
		super();
		this.marker = marker;
		this.requete();
		//this.icones();
		//this.markers();
		console.log(this);
	}
	requete() {
		
		this.xhr = new XMLHttpRequest();
		this.xhr.open('GET', 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=4fd36bf901d835d9bf90b74a5a41c9e4a52e8451', true);
		this.xhr.addEventListener('load', (e) => {
			if (this.xhr.readyState === 4 && (this.xhr.status === 200 || this.xhr.status === 0 /* Pour gérer en local la requête */)) {
				const response = JSON.parse(this.xhr.responseText);
				
				return this.markers();
			}
		});
		console.log(this);
	}
	markers() {
		console.log(this);
		// Ajouts de marqueurs
		
		const tabJson = this.response;
		for (let i = 0; i < this.tabJson.length; i++) {
		  	this.data = this.tabJson[i].position,
		  	this.latLng = new google.maps.this.LatLng(this.data.lat, this.data.lng); 
		  	if (this.tabJson[i].available_bikes >= 1 && this.tabJson[i].status =='OPEN') {
	  			return this.iconeVerte;
	  		} else if (this.tabJson[i].available_bike_stands <= this.tabJson[i].bike_stands && this.tabJson[i].available_bike_stands >= 1) {
	  			return this.iconeBleue;
	  		} else if (this.tabJson[i].status =='CLOSED') {
	  			return this.iconeRouge;
	  		} 
		  	this.marker = new google.maps.Marker({
			    position: this.latLng,
			    map: this.map,
			    icon: this.icones(),
			    title: this.tabJson[i].name
		  	});;
		}
		console.log(this);
	}
	icones() {
		console.log(this);
		this.iconeVerte = {
			url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
			size: new google.maps.Size(40,50),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(0,20)
		};
		this.iconeRouge = {
			url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
			size: new google.maps.Size(40,50),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(0,20)
		};
		this.iconeBleue = {
			url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
			size: new google.maps.Size(40,50),
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(0,20) 
		};
		console.log(this);
	}
	
}


