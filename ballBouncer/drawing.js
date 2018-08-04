function drawInfo() {
  noStroke();
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("fps: " + floor(frameRate()), width - 50, height - 20);
  text("score: " + score, 50, height - 20);
  if (lose) {
    noStroke();
    fill(255, 0, 0);
    textSize(24);
    text("perdu", width * 0.5, height - 20);
  }
}

function drawScene() {
  colorMode(RGB);
  strokeWeight(1);
  background(0);
  stroke(255);
  line(0, (width / TOTAL_LINE) * 19, width, (width / TOTAL_LINE) * 19);
}

function drawSquares() {
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = TOTAL_LINE - 1; j >= 0; j--) {
      if (board[i][j] !== undefined) {
        board[i][j].show();
        if (board[i][j].hp <= 0) {
          board[i][j] = undefined;
        }
      }
    }
  }
}

function drawBalls() {
  for (const ball of balls) {
    ball.show();
  }
}

function drawline() {
  let a = 100 - balls.length;
  if (a >= 0) {
    stroke(255, a);
    line(nextPos.x, nextPos.y, mouseX, mouseY);
  }
}

function nextLine() {
  if (board.length > height / (width / TOTAL_LINE) - 3) {
    lose = true;
    return;
  }

  let line = [];
  for (let i = 0; i < TOTAL_LINE; line[i++] = undefined);
  for (let i = 0; i < TOTAL_LINE; i++) {
    if (random(1) < 0.5) {
      line[i] = new Brick(balls.length + 1, i);
    }
  }
  board.push(line);
  balls.push(new Ball(nextPos.x, nextPos.y, balls.length));
  Brick.update();
}
