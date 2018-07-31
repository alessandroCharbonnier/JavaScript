let terrain = [];

let cols;
let rows;

let w = 3500;
let h = 2500;
let scl = 15;

let flying = 0;

function setup() {
	p5.disableFriendlyErrors = true;
	createCanvas(windowWidth, windowHeight, WEBGL);

	cols = w / scl;
	rows = h / scl;

	for (let x = 0; x < cols; x++) {
		terrain[x] = [];
		for (let y = 0; y < rows; y++) {
			terrain[x][y] = 0;
		}
	}
}

function draw() {
	flying -= 0.1;

	let yoff = flying;
	for (let y = 0; y < rows; y++) {
		let xoff = 0;
		for (let x = 0; x < cols; x++) {
			terrain[x][y] = map(noise(xoff, yoff), 0, 1, -150, 150);
			xoff += 0.05;
		}
		yoff += 0.0388;
	}

	background(0);
	translate(0, 50);
	rotateX(PI / 3);

	fill(0,255,255, 20);
	noStroke();
	strokeWeight(1);

	translate(-w / 2, -h / 2);
	for (var y = 0; y < rows - 1; y++) {
		beginShape(TRIANGLE_STRIP);
		for (var x = 0; x < cols; x++) {
			vertex(x * scl, y * scl, terrain[x][y]);
			vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
		}
		endShape();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
