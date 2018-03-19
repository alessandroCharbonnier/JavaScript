let txt;
let name;
let accuracy;
let score = 0;
let clicks = 0;
let ex = false;
let bubbles = [];
let usersNames = [];
let usersScores = [];
let usersAccuracy = [];

function preload() {
  txt = loadStrings("score.txt");
  console.log(txt);
}

function setup() {
  loadScores();
  getHeightScore();
  name = askName();
  createCanvas(640, windowHeight);
  for (let i = 0; i < 6; i++) {
    bubbles[i] = new Bubble(i);
  }
}

function draw() {
  background(0)
  for (let i = 0; i < bubbles.length; i++) {
    if (!ex) {
      bubbles[i].move();
      bubbles[i].disp();
      textSize(50);
      fill(0, 255, 255);
      text(score, 10, 45);
    } else {
      noLoop();
      accuracy = getAccuracy(clicks, score);
      writeScore(name, score, accuracy);
      break;
    }
  }
}

function mousePressed() {
  clicks++;
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}

function keyPressed() {
  clicks++;
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}