class Firework {
	constructor() {
		this.pos = createVector(random(width), height - 50);
		this.yspeed = random(-12, -5);
		this.col = color(random(360), 255, 255);
		this.r = random(3, 7);
		this.h;
	}

	show() {
		if (-this.r < this.pos.x && this.pos.x < (width + this.r) && -this.r < this.pos.y && this.pos.y < (height + this.h)) { /* only drawing if in the screen */
			fill(this.col);
			ellipse(this.pos.x, this.pos.y, this.r, this.h);
		}
	}

	update() {
		this.yspeed += 0.1;
		this.pos.y += this.yspeed;
		this.h = map(this.yspeed, -12, 0, 10, this.r);
	}
}
