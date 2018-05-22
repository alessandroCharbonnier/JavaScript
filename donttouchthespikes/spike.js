class Spike {
  constructor() {
    this.spikes = [];
    this.gap = 15;
    this.pic = 5;
    this.fillSpikes();
  }

  fillSpikes() {
    let count = 0;
    this.spikes = [];
    for (let i = 0; i < height / imgHeight; i++) {
      if (doYouKnowDaWae < 0) {
        let x1 = 0;
        let y1 = i * imgHeight + this.gap;
        let x2 = this.pic;
        let y2 = i * imgHeight + imgHeight * 0.5;
        let x3 = 0;
        let y3 = (i * imgHeight) + imgHeight - this.gap;
        this.spikes[i] = new Triangle(x1, y1, x2, y2, x3, y3);
      } else {
        let x1 = width;
        let y1 = i * imgHeight + this.gap;
        let x2 = width - this.pic;
        let y2 = i * (imgHeight) + imgHeight * 0.5;
        let x3 = width;
        let y3 = (i * imgHeight) + imgHeight - this.gap;
        this.spikes[i] = new Triangle(x1, y1, x2, y2, x3, y3);
      }
      // if (random(1) < 0.6) {
      // 	this.spikes[i].obstacle = true;
      // 	count++;
      // }
    }
    // if (count === this.spikes.length) {
    let i = floor(random(1, this.spikes.length - 2));
    this.spikes[i].obstacle = false;
    this.spikes[i + 1].obstacle = false;
    // }
  }

  findGap() {
    let i = floor((height / imgHeight));
    let gap = height - (i * imgHeight);
    return gap;
  }

  intersect(object) {
    let hit = false;
    for (let i = 0; i < this.spikes.length; i++) {
      hit = this.spikes[i].intersect(object);
      if (hit) {
        return true;
      }
    }
    return false;
  }

  swap() {
    for (let i = 0; i < this.spikes.length; i++) {
      if (doYouKnowDaWae < 0) {
        let x1 = 0;
        let y1 = i * imgHeight + this.gap;
        let x2 = this.pic;
        let y2 = i * (imgHeight) + imgHeight * 0.5;
        let x3 = 0;
        let y3 = (i * imgHeight) + imgHeight - this.gap;
        this.spikes[i].relocate(x1, y1, x2, y2, x3, y3);
      } else {
        let x1 = width;
        let y1 = i * imgHeight + this.gap;
        let x2 = width - this.pic;
        let y2 = i * (imgHeight) + imgHeight * 0.5;
        let x3 = width;
        let y3 = (i * imgHeight) + imgHeight - this.gap;
        this.spikes[i].relocate(x1, y1, x2, y2, x3, y3);
      }
    }
  }

  show() {
    for (let i = 0; i < height / imgHeight; i++) {
      if (this.spikes[i].obstacle === true) {
        this.spikes[i].show();
      }
    }
  }
}

class Triangle {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.p1 = createVector(x1, y1);
    this.p2 = createVector(x2, y2);
    this.p3 = createVector(x3, y3);
    this.obstacle = true;
  }

  relocate(x1, y1, x2, y2, x3, y3) {
    this.p1 = createVector(x1, y1);
    this.p2 = createVector(x2, y2);
    this.p3 = createVector(x3, y3);
  }

  intersect(object) {
    if (this.obstacle === false) {
      return false;
    }
    let poly = [];
    poly[0] = createVector(this.p1.x, this.p1.y);
    poly[1] = createVector(this.p2.x, this.p2.y);
    poly[2] = createVector(this.p3.x, this.p3.y);

    return (collideRectPoly(object.pos.x, object.pos.y, object.img.width * 0.75, object.img.height * 0.75, poly) ||
      collideRectRect(object.pos.x, object.pos.y, object.img.width * 0.75, object.img.height * 0.75, 0, height - 1, width, 2) ||
      collideRectRect(object.pos.x, object.pos.y, object.img.width * 0.75, object.img.height * 0.75, 0, 1, width, 2));
  }

  show() {
    fill(0);
    noStroke();
    if (this.obstacle) {
      triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    }
  }
}