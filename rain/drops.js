var drops = []

function Drop() {
  fill(10, 215, 255, 100)
  noStroke()
  this.x = random(width)
  this.y = random(-height)
  this.yspeed = random(8, 15)
  this.len = random(4, 17)

  this.fall = function() {
    this.y += this.yspeed
  }

  this.show = function() {
    rect(this.x, this.y, 1, this.len)
    if (this.y - this.len > height)
      this.y = random(-height)
  }
}