var particules = []

function Particule() {
  this.pos = createVector(random(1, width), random(1, height))
  this.vel = createVector()
  this.show = function() {
    stroke(0, 30)
    point(this.pos.x, this.pos.y, 1, 1)
  }

  this.update = function() {
    this.pos.add(this.vel)
  }

  this.applyforce = function() {
    var pospixel = round(this.pos.x * this.pos.y)
    this.vel = pixelvector[pospixel].copy()
  }

  this.edges = function() {
    if (this.pos.x > width - 1) {
      this.pos.x = 1
    } else if (this.pos.x < 1) {
      this.pos.x = width - 1
    }
    if (this.pos.y > height - 1) {
      this.pos.y = 1
    } else if (this.pos.y < 1) {
      this.pos.y = height - 1
    }
  }
}