let vehicules = [];
const NUMVEHICULES = 60;
let maxDist;

function setup() {
	frameRate(60);
	createCanvas(windowWidth, windowHeight);
	maxDist = dist(0, 0, width, height);
	for (let i = 0; i < NUMVEHICULES; i++) {
		vehicules.push(new Vehicule(random(width), random(height)));
	}
}

function draw() {
	// clear background
	background(0);

	// draw all vehicules
	for (let i = vehicules.length - 1; i >= 0; i--) {
		const vehicule = vehicules[i];
		vehicule.run();
	}

	// draw infos
	fill(255);
	noStroke();
	text("fps : " + floor(frameRate()), 10, 15);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	maxDist = dist(0, 0, width, height);
}
