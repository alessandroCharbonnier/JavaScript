var rocket

function Rocket() {
  this.pos = createVector(random(width / 2), random(height))
  this.vel = createVector()

  this.show = function() {
    push();
    noStroke();
    fill(255);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 10, 5);
    pop();
  }

  this.update = function() {
    this.getangle(this.pos.x, this.pos.y)
    this.pos.add(this.vel)
  }

  this.getangle = function(x, y) {
    var a = Math.atan2(mouseY - y, mouseX - x)
    this.vel.x = lerp(this.vel.x, cos(a) * 10, 0.05)
    this.vel.y = lerp(this.vel.y, sin(a) * 10, 0.05)
  }
}