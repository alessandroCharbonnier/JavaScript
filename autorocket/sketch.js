let fr;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rocket = new Rocket();
  t = new Target();
  rectMode(CENTER);
  for (let i = 0; i < 20; i++) {
    squares[i] = new Square();
  }
}

function draw() {
  noStroke();
  background(0);
  t.show();

  for (let flame of squares) {
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