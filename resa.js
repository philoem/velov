// STORAGE
function resa() {
	if(typeof sessionStorage!='undefined') {
  		// Stockage
  		sessionStorage.setItem('nom', document.getElementById('formGroupExampleInput').value);
  		sessionStorage.setItem('mail', document.getElementById('formGroupExampleInput2').value);
  		// Récupération
  		let prenomNom = sessionStorage.getItem('nom');
  		let mail = sessionStorage.getItem('nom');
  		// Insertion des données dans le footer
  		let footer = document.getElementById('piedPage');
  		footer.innerHTML = `
			${prenomNom}
      <p>Ceci est un test de stockage</p>
  		`;
	} else {
		console.log("le sessionStorage n'est pas disponible sur votre navigateur");
	} 
}
//function resaPermanente() {
//		let prenomNom = sessionStorage.getItem('nom');
//		let mail = sessionStorage.getItem('nom');
//		let footer = document.getElementById('piedPage');
//		footer.innerHTML = `
//		
//		${sessionStorage.getItem('nom')}
//		`;
//}
// Efface toutes les données dans le sessionStorage
function eraseResa() {
	sessionStorage.clear();
}
/*function resa() {
  const resa = new Resa();
}
class Resa {
  constructor(nom, mail) {
    // Emplacement des données
    this.footer = document.getElementById('piedPage');
    
    //this.eraseResa();
    this.recuperation();
  }
  recuperation() {
    // Stockage
    sessionStorage.setItem('nom', document.getElementById('formGroupExampleInput').value);
    sessionStorage.setItem('mail', document.getElementById('formGroupExampleInput2').value);
    // Récupération des données 
    sessionStorage.getItem('nom');
    sessionStorage.getItem('mail');
    // Affichage des données dans le footer
    this.footer.innerHTML = ` ${sessionStorage.getItem('nom')}  `;
  }
  //eraseResa() {
  //  if (counter() === 0) {
  //    sessionStorage.clear();
  //  }
  //}
}
*/
