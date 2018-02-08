// Compte à rebours
/*let counter = 1200;// Pour partir de 20 minutes, nombre en secondes ici

function convertSeconds(s) {
	let min = Math.floor(s / 60);
	if (min < 10) {
		min = '0' + min;
	}	
	let sec = s % 60;
	if (sec < 10) {
		sec = '0' + sec;
	}
	return `Il vous reste  ${min} : ${sec}  minutes pour récupérer votre vélo à la station.`;
}
function countDown() {
	const timer = document.getElementById('piedPage');
	
	timer.innerHTML =`${convertSeconds(counter)}`;
	setTimeout(timeIt, 1000);
	let interval = setInterval(timeIt, 1000);
	function timeIt() {
		counter--;
		timer.innerHTML =` ${convertSeconds(counter)}`;
		if (counter < 0) {
			timer.innerHTML =`
				<p>Le temps de la réservation du vélo est dépassé !</p>
			`;
			clearInterval(interval);
		} 
	}
}*/
// Compte à rebours des 20 minutes
function counter() {
	const countDown = new compteRebours(1201);// 20 min x 60 sec = 1200 + 1 pour démarrer à 20:00 tout rond
	//const champsValidated = new Validate();
}
class compteRebours {
	constructor(s) {
		this.s = s;
		this.min = Math.floor(this.s / 60);
		this.sec = this.s % 60;
		this.timer = document.getElementById('piedPage');
		this.champs = document.getElementsByTagName('input');		
		this.start();
	}
	start() {
		console.log(this);
		if (this.champs == '') {
			this.timer.innerHTML = `<h3>Veuillez remplir le champs de votre prénom et nom</h3> `;

		}	
		this.interval = setInterval(() => {
			this.s--;
			this.timer.innerHTML =` ${this.convertSeconds(this.s)} `;
			this.timer.innerHTML = ` 
			<p id="timer" class="justify-content-center col-xs-12"> Il vous reste <strong> ${this.min} : ${this.sec} </strong>  minutes pour récupérer votre vélo à la station.</p>
			`;
			
			// Condition pour stopper à 0 le décompte et effacer du même coup les données dans la sessionStorage !
			if (this.s < 0) {
				this.timer.innerHTML =`<p id="timer" class="justify-content-center col-xs-12">Le temps de la réservation du vélo est dépassé !</p>`;
				clearInterval(this.interval);
				eraseResa();
			} 
		}, 1000);
		
	}
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
}
// Héritage avec nouvelle classe ne lançant pas le compte à rebours si le champs du nom dans le formulaire n'est pas rempli
//class Validate extends compteRebours {
//	constructor(timer) {
//		const champs = document.getElementById('formGroupExampleInput');
//		super(timer, champs);
//
//		this.condition();
//	}
//	condition() {
//		document.getElementById('btn_resa').addEventListener('submit', (event) => {
//			if (this.champs == '') {
//				event.preventDefault();
//				this.timer.innerHTML = `<h3>Veuillez remplir le champs de votre prénom et nom `;
//			}
//		});
//	}
//}

