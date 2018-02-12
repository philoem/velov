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
	loadStation() {
		//ajax
	}
	setMarker() {
		this.marker = [];
		for (let i = 0; i < tabJson.length; i++) {
			this.marker = new Marker()
		}
	}
	setStations() {
		// Click markers => formulaires (api JC DECAUX)
	}
}
class Marker {
	constructor(data) {
		this.marker = new google.maps.Marker({
			position: {lat: data.lat, lng: data.lng}
			map: Map
			title: data.name 
		});
		this
		// En fonction du statut des stations les différentes icones
		if () {

		}
		this.marker.addListener('click', () => {

		})
	}
}


