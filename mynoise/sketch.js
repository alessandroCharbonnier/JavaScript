var pixelvector = []
var loc

function setup() {
  loc = 0
  createCanvas(windowWidth, windowHeight)
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      pixelvector[loc] = createVector(random(-1, 1), random(-1, 1))
      loc++
    }
  }
  for (var i = 0; i < 1200; i++) {
    particules[i] = new Particule()
  }
  background(255, 0)
}

function draw() {
  for (var i = 0; i < particules.length; i++) {
    particules[i].edges()
    particules[i].applyforce()
    particules[i].update()
    particules[i].show()
  }
}