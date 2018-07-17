function setup() {
  rectMode(CENTER);
  createCanvas(800, 800);
  for (var i = 0; i < 30; i++) {
    squares[i] = new Square();
  }
  noStroke();
}

function draw() {
  background(0);
  for (var i = 0; i < squares.length; i++) {
    squares[i].update();
    squares[i].show();
    squares[i].kill();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
