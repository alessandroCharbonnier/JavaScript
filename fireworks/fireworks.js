function Firework() {
  this.pos = createVector(random(width), height)
  this.yspeed = random(-12, -5)
  this.col = color(random(360), 255, 255)
  this.r = random(3, 7)

  this.show = function() {
    fill(this.col)
    ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }

  this.update = function() {
    this.yspeed += 0.1
    this.pos.y += this.yspeed
  }
}