let birdright;
let birdleft;
let bird;
let spike;
let score = 0;

function preload() {
	birdright = loadImage('birdright.png');
	birdleft = loadImage('birdleft.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	bird = new Bird();
	spike = new Spike();
	textAlign(CENTER, CENTER);
}

function draw() {
	background(155);

	fill(255);
	noStroke();
	textSize(10);
	text(floor(frameRate()), 10, 10);
	textSize(150);
	text(score, width * 0.5, height * 0.5);

	bird.update();
	bird.show();

	if (spike.intersect(bird)) {
		console.log('yes');
		bird.reset();
		score = 0;
	}
	spike.show();
}

function keyPressed() {
	if (key == ' ') {
		bird.up();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
