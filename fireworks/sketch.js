var fireworks = []
var particules = []

function create() {
  var juj = random(0, 10)
  if (juj < 0.5) {
    fireworks.push(new Firework())
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB)
}

function draw() {
  stroke(16)
  background(0, 100)
  noStroke()
  create()
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].show()
    fireworks[i].update()
    if (fireworks[i].yspeed >= 0) {
      for (var j = 0; j < random(8, 101); j++) {
        particules.push(new Particule(fireworks[i].pos.x, fireworks[i].pos.y, fireworks[i].col, fireworks[i].r))        
      }
        fireworks.splice(i, 1)
    }
  }
  for (i = particules.length - 1; i >= 0; i--) {
    particules[i].show()
    particules[i].move()
    if (particules[i].a < 0) {
      particules.splice(i, 1)
    }
  }
}