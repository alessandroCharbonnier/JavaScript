function Seed(x, y, r, g, b) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;

  this.display = function() {
    colorMode(HSB);
    fill(this.r, this.g, this.b);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}