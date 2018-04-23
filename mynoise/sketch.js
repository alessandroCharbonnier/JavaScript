let pixelvector = [];
let loc;

function setup() {
	loc = 0;
	createCanvas(windowWidth, windowHeight)
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			pixelvector[loc] = createVector(random(-1, 1), random(-1, 1));
			loc++;
		}
	}
	for (let i = 0; i < 1200; i++) {
		particules[i] = new Particule();
	}
	background(255, 0);
}

function draw() {
	for (let i = 0; i < particules.length; i++) {
		particules[i].edges();
		particules[i].applyforce();
		particules[i].update();
		particules[i].show();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
