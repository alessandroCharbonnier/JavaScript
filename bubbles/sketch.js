
function setup() {
  createCanvas(windowWidth, windowHeight)
  for (var i = 0; i < 10; i++) {
    bubbles[i] = new Bubble()
  }
}

function draw() {
	strokeWeight(10);
  background(0)
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].edges()
    bubbles[i].move()
    bubbles[i].show()
  }
}