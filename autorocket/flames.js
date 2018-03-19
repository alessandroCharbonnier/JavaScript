let squares = []

function Square(x, y) {
  this.r = 255;
  this.pos = createVector(x, y);
  this.vel = createVector(random(-1, 1), random(-1, 1));

  this.update = function() {
    this.pos.add(this.vel);
    this.r -= 50;
  }

  this.show = function() {
    this.c = color(255, this.r, 0);
    fill(this.c);
    rect(this.pos.x, this.pos.y, 5, 5);
  }

  this.kill = function() {
    for (let i = squares.length - 1; i >= 0 ; i--) {
      if (squares[i].r < 0) {
        squares.splice(i, 1);
        squares.push(new Square(rocket.pos.x, rocket.pos.y));
      }
    }
  }
}
