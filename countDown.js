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
		this.champs = document.getElementById('formGroupExampleInput');		
		this.start();
	}
	start() {
		this.interval = setInterval(() => {
			this.s--;
			this.timer.style.display = 'block';
			this.timer.innerHTML =` ${this.convertSeconds(this.s)} `;
			this.timer.innerHTML = ` 
			<p id="timer" class="justify-content-center col-xs-12">${sessionStorage.getItem('nom')}, il vous reste <strong>
			 ${this.min} : ${this.sec} </strong>  minutes pour récupérer votre vélo à la station.</p>
			`;
			// Condition pour stopper à 0 le décompte et effacer du même coup les données dans la sessionStorage !
			if (this.s < 0) {
				this.timer.innerHTML =`<p id="timer" class="justify-content-center col-xs-12">Le temps de la réservation
				 du vélo est dépassé !</p>
				`;
				clearInterval(this.interval);
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

