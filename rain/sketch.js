
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 600; i++) {
    drops[i] = new Drop();
  }
  fill(10, 215, 255, 100);
  noStroke();
}

function draw() {
  background(0, 150);
  for (let i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
