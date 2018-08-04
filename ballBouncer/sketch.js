let score = 0;
let board = [];
let tempBalls = [];
let balls = [];
let lose = false;
const TOTAL_LINE = 15;
let nextPos;

function setup() {
  createCanvas(windowHeight * (12 / 16), windowHeight);
  nextPos = createVector(width * 0.5, (width / TOTAL_LINE) * 19);
  nextLine();
}

function draw() {
  drawScene();
  drawSquares();
  drawBalls();
  fill(0);
  noStroke();
  rect(0, (width / TOTAL_LINE) * 19, width, height);
  drawline();
  drawInfo();

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    if (balls[i].toDelete) {
      if (balls[i].index === 0) {
        nextPos.x = balls[i].pos.x;
      }
      balls.splice(i, 1);
      tempBalls.push(new Ball(nextPos.x, nextPos.y, tempBalls.length));
    }
  }

  if (balls.length === 0) {
    for (const ball of tempBalls) {
      ball.pos.x = nextPos.x;
    }
    balls = tempBalls;
    tempBalls = [];
    nextLine();
  }
}

function mouseClicked() {
  let x = mouseX;
  let y = mouseY;
  if (!lose) {
    let i = 0;
    let timer = setInterval(function() {
      balls[i++].fireAngle(x, y);
      if (i >= balls.length) clearInterval(timer);
    }, 50);
  }
}

function windowResized() {
  resizeCanvas(windowHeight * (12 / 16), windowHeight);
}
