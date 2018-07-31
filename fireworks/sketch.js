let fireworks = [];
let particules = [];

function create() {
  if (random(0, 10) < 0.5) {
    fireworks.push(new Firework());
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  stroke(16);
  background(0, 100);
  noStroke();
  create();
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].yspeed >= 0) {
      for (let j = 0; j < random(8, 200); j++) {
        particules.push(new Particule(fireworks[i].pos.x, fireworks[i].pos.y, fireworks[i].col, fireworks[i].r));
      }
        fireworks.splice(i, 1);
    }
  }
  for (i = particules.length - 1; i >= 0; i--) {
    particules[i].move();
    particules[i].show();
    if (particules[i].a < 0) {
      particules.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
