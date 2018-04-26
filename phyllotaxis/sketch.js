let c = 0.6;
let n = 0;
let a = 137.5;

let array = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	angleMode(DEGREES);
	colorMode(HSB);
}

function draw() {
	background(0);
	translate(width / 2, height / 2);
	for (let i = 0; i < 100; i++) {
		let angle = n * a;
		let r = c * sqrt(angle);
		let x = r * cos(angle);
		let y = r * sin(angle);
		n++;
		array.push(new Seed(x, y, (angle - n) % 361, 255, 255));
	}

	for (let seed of array) {
		seed.display();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
