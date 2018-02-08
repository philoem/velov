//Slider
class Slider {
	constructor(imageSlider, imagesTab) {
		this.imageSlider = imageSlider;
		this.imagesTab = imagesTab;
		this.count = 0;
		this.declaration();
	}
	// Méthode initialisant et déclarant les événements du slider
	declaration() {
		document.querySelector('#next').addEventListener("click", () =>  {
			this.goRight();
		})
		document.querySelector('#prev').addEventListener("click", () =>  {
			this.goLeft();
		})
		//Défilement avec les touches fléchées gauche et droite
		document.addEventListener('keydown', () => {
			this.arrows(event);
		})
		//Défilement automatique
		setInterval(() => {this.goRight() }, 15000);
	}
	// Méthode gérant le défilement à gauche du slider
	goLeft() {
		this.count--;
		if (this.count < 0) {
			this.count = this.imagesTab.length -1;
		}
		this.imageSlider.src= this.imagesTab[this.count];
	}
	// Méthode gérant le défilement à droite du slider
	goRight() {
		this.count++;
		if (this.count >= this.imagesTab.length) {
			this.count = 0;
		}
		this.imageSlider.src= this.imagesTab[this.count];
	}
	// Méthode gérant les touches directionnelles du clavier
	arrows(event) {
		if (event.keyCode === 37) {
			this.goLeft();
		}
		else if (event.keyCode === 39) {
			this.goRight();
		}
	}
}
const imageSlider = document.querySelector('#imageSlider');
const imagesTab = ['photos/etape1bis.jpg', 'photos/etape2bis.jpg', 'photos/etape3bis.jpg', 'photos/etape4bis.jpg']; 
		
const slider = new Slider(imageSlider, imagesTab);
