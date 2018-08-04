class Brick {
  constructor(hp, x) {
    this.totalHp = hp;
    this.hp = hp;
    if (random(1) < 0.12) {
      this.hp *= 2;
    }
    this.w = width / TOTAL_LINE;
    this.h = this.w - 8;
    this.pos = createVector(x, 0);
  }

  show() {
    colorMode(HSB);
    noFill();
    strokeWeight(3);
    const col = color(this.hp % 361, 255, 255);
    stroke(col);
    rect(this.pos.x * this.w, this.pos.y * this.w, this.h, this.h);
    strokeWeight(1);
    textSize(14);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(col);
    text(
      this.hp,
      this.pos.x * this.w + this.h / 2,
      this.pos.y * this.w + this.h / 2
    );
    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  intersect(obj) {
    if (
      collideRectCircle(
        this.pos.x * this.w,
        this.pos.y * this.w,
        this.w,
        this.w,
        obj.pos.x,
        obj.pos.y,
        obj.r
      )
    ) {
      if (
        abs(this.pos.x * this.w + this.h / 2 - obj.pos.x) >
        abs(this.pos.y * this.w + this.h / 2 - obj.pos.y)
      ) {
        return 1;
      }
      return 2;
    }
    return 0;
  }

  static update() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < TOTAL_LINE; j++) {
        if (board[i][j] !== undefined) {
          board[i][j].pos.y = abs(balls.length - board[i][j].totalHp + 1);
        }
      }
    }

    let count = 0;
    for (const brick of board[0]) {
      if (brick === undefined) {
        count++;
      }
    }
    if (count >= TOTAL_LINE) {
      board.splice(0, 1);
    }
  }
}
