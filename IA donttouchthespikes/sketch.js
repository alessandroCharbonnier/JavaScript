let birdright;
let birdleft;
let savedBirds = [];
let birds = [];
let spike;
let doYouKnowDaWae;
let generation = 0;
let loopt = 1;
const imgWidth = 80 * 0.75;
const imgHeight = 53 * 0.75;
const TOTAL = 150;
let slider;

function preload() {
	birdright = loadImage("./images/birdright.png");
	birdleft = loadImage("./images/birdleft.png");
}

function setup() {
	createCanvas(windowHeight * 0.56, windowHeight - 20);
	spike = new Spike();
	for (var i = 0; i < TOTAL; i++) {
		birds[i] = new Bird();
	}
	doYouKnowDaWae = birds[0].vel.x;
	spike.swap();
	slider = createSlider(1, 100, 1);
}

function draw() {
	background(155);

	fill(255);
	noStroke();
	textSize(16);
	textAlign(LEFT, CENTER);
	text("fps : " + floor(frameRate()), 10, 10);
	text("generation : " + generation, 10, 26);
	text("birds alive : " + birds.length, 10, 43);
	text("loops/frames : " + slider.value(), 10, 60);
	textSize(150);
	textAlign(CENTER, CENTER);
	text(birds[0].points.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false }), width * 0.5, height * 0.5);

	for (let i = 0; i < slider.value(); i++) {
		doYouKnowDaWae = birds[0].vel.x;

		for (let i = birds.length - 1; i >= 0; i--) {
			birds[i].think();
			birds[i].update();
			spike.swap();
			if (birds[i].edges()) {
				spike.fillSpikes();
			}

			if (spike.intersect(birds[i])) {
				savedBirds.push(birds.splice(i, 1)[0]);
			}
		}

		if (birds.length === 0) {
			nextGeneration();
		}
	}

	for (bird of birds) {
		bird.show();
	}
	spike.show();
}

function findHoll() {
	for (s of spike.spikes) {
		if (!s.obstacle) {
			let n = s.p2;
			//n.y += 20;
			return n;
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth - 20, windowHeight - 20);
}
