let spacing = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 130, 200);
}

function draw() {
  background(0, 130, 200);
  stroke(250);
  strokeWeight(4);
  for (let x = 0; x < width; x += spacing) {
  	for (let y = 0; y < height; y += spacing) {
  	  if (random(1) < 0.5) {
  	  	line(x, y ,x + spacing, y + spacing);
  	  }else {
  	  	line(x, y + spacing, x + spacing, y);
  	  }
  	}
  }
  noLoop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}