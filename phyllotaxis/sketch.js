var c = 0.6;
var n = 0;
var a = 137.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
   translate(width / 2, height / 2);
    var angle = n * a;
    var r = c * sqrt(angle);
    var x = r * cos(angle);
    var y = r * sin(angle);
    fill((angle - n) % 256, 255, 255);
    stroke((angle - n) % 256, 255, 255);
    ellipse(x, y, 10, 10);
    n++;
}