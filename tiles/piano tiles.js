var ex = false;
var score = 0;
var bubbles = [];

function Bubble(t) {
  this.d = width / 5;
  this.r = this.d / 2;
  this.x = random(width / 5, width - (width / 5));
  this.y = (-height / 5) * t;
  this.speed = 5;
  this.col = color(255);
  this.click = false;

  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.r && !this.click) {
      this.col = color(255, 0, 255);
      this.click = true;
      score++;
    }
  }

  this.disp = function() {
    fill(this.col);
    noStroke();
    if (!this.click) {
      ellipse(this.x, this.y, this.d, this.d);
    }
  }

  this.move = function() {
    if ((this.y > height + this.r) && (this.click)) {
      this.click = !this.click;
      this.x = random(width / 5, width - width / 5);
      this.y = (-height / 5);
      this.col = color(255);

    } else if ((this.y > height + this.r) && (!this.click)) {
      ex = true;
      noLoop();
      fill(255, 0, 0);
      textSize(50);
      text("perdu", width / 2 - 100, 100);
      text("score de : " + score, 50, 500);
    }
  }
}

function setup() {
  createCanvas(640, windowHeight);
  for (var i = 0; i < 6; i++) {
    bubbles[i] = new Bubble(i);
  }
}

function draw() {
  background(0)
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].speed *= 1.0003;
    bubbles[i].y += bubbles[i].speed;
    if (!ex) {
      bubbles[i].move();
      bubbles[i].disp();
      textSize(50);
      fill(0, 255, 255);
      text(score, 10, 45);
    } else {
      noLoop();
    }
  }
}

function mousePressed() {
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}

function keyPressed() {
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}