let fr;

function setup() {
	createCanvas(windowWidth, windowHeight);
	rocket = new Rocket();
	t = new Target();
	rectMode(CENTER);
}

function draw() {
	noStroke();
	background(0);
	t.show();

	for (let flame of rocket.flames) {
		flame.update();
		flame.show();
		flame.kill();
	}

	rocket.update();
	rocket.show();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
