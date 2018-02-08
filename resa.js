// STORAGE
function resa() {
	if(typeof sessionStorage!='undefined') {
  		// Stockage
  		sessionStorage.setItem('nom', document.getElementById('formGroupExampleInput').value);
  		sessionStorage.setItem('mail', document.getElementById('formGroupExampleInput2').value);
  		// Récupération
  		const prenomNom = sessionStorage.getItem('nom');
  		const mail = sessionStorage.getItem('nom');
  		// Insertion des données dans le footer
  		const footer = document.getElementById('piedPage');
  		footer.innerHTML = `
			<p>Ceci est un test de stockage</p>
			${sessionStorage.getItem('nom')}
  		`;

	} else {
		console.log("le sessionStorage n'est pas disponible sur votre navigateur");
	} 
}
function resaPermanente() {
	
		const prenomNom = sessionStorage.getItem('nom');
  		const mail = sessionStorage.getItem('nom');
  		const footer = document.getElementById('piedPage');
  		footer.innerHTML = `
			
			${sessionStorage.getItem('nom')}
  		`;
  		

}

// Efface toutes les données dans le sessionStorage
function eraseResa() {
	sessionStorage.clear();
}

