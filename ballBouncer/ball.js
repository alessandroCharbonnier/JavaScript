class Ball {
  constructor(x, y, index) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.r = 8;
    this.index = index;
    this.fired = false;
    this.toDelete = false;
  }

  show() {
    colorMode(RGB);
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  update() {
    if (this.fired) {
      if (this.pos.x > width - this.r) {
        this.vel.x *= -1;
        this.pos.x = width - this.r;
      } else if (this.pos.x < this.r) {
        this.vel.x *= -1;
        this.pos.x = this.r;
      }
      if (this.pos.y < this.r) {
        this.vel.y *= -1;
        this.pos.y = this.r;
      }
      if (this.pos.y > (width / TOTAL_LINE) * 19) {
        this.toDelete = true;
      } else {
        this.pos.add(this.vel);
      }

      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < TOTAL_LINE; j++) {
          if (board[i][j] !== undefined) {
            const inter = board[i][j].intersect(this);
            if (inter !== 0) {
              board[i][j].hp--;
              score++;
              if (board[i][j].hp <= 0) {
                board[i][j] = undefined;
              }
              if (inter === 1) {
                this.vel.x *= -1;
              } else if (inter === 2) {
                this.vel.y *= -1;
              }
            }
          }
        }
      }
    }
  }

  fireAngle(x, y) {
    if (!this.fired) {
      let a = Math.atan2(y - this.pos.y, x - this.pos.x);
      this.vel.x = cos(a) * 8;
      this.vel.y = sin(a) * 8;
      this.fired = true;
    }
  }
}
