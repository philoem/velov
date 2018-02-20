function signatureCapture() {
	let canvas = document.getElementById('signatureCanvas');
	let context = canvas.getContext('2d');
	let radius = 1.5;
	let painting = false;
	canvas.height = 150 ;
	canvas.width = 350 ; 
	context.fillStyle = "#007BFF";
	context.strokeStyle = "#007BFF";
	context.lineWidth = radius*2.2;
	let clientX, clientY;// Pour le tactile

	function putPoint(e) {
		if (painting) {
			context.lineTo(e.offsetX, e.offsetY);
			context.stroke();
			context.beginPath();
			context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
			context.fill();
			context.beginPath();
			context.moveTo(e.offsetX, e.offsetY);
		}
	}
	function engage(e) {
		painting = true;
		putPoint(e);
	}
	function disengage(e) {
		painting = false;
		context.beginPath();
	}
	canvas.addEventListener('mousedown', engage);
	canvas.addEventListener('mousemove', putPoint);
	canvas.addEventListener('mouseup', disengage);
	// PARTIE TACTILE
	canvas.addEventListener('touchstart', function(e) {
		let touches = e.touches[0];
		clientX = touches.clientX;
		clientY = touches.clientY;
		console.log(clientX, clientY);
	});
	canvas.addEventListener('touchmove', function(e) {
		painting = true;
		context.beginPath();
		context.moveTo(e.offsetX, e.offsetY);
		//context.lineTo(clientX, clientY);
		//context.stroke();
		//context.beginPath();
		//context.arc(clientX, clientY, 10, 0, Math.PI*2);
		//context.fill();
		//context.beginPath();
		console.log(clientX, clientY);
	});
	canvas.addEventListener('touchend', disengage);
}
function signatureClear() {
	const canvas = document.getElementById("signatureCanvas");
	const context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
}