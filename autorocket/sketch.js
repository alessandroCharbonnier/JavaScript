
function setup() {
  createCanvas(windowWidth, windowHeight)
  rocket = new Rocket()
  t = new Target()
  rectMode(CENTER)
  for (var i = 0; i < 20; i++) {
    squares[i] = new Square()
  }
}

function draw() {
  noStroke()
  background(0)
  t.show()
  for (var i = 0; i < squares.length; i++) {
    squares[i].update()
    squares[i].show()
    squares[i].kill()
  }

  rocket.update()
  rocket.show()
}