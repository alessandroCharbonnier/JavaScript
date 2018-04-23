class Firework {
	constructor() {
		this.pos = createVector(random(width), height);
		this.yspeed = random(-12, -5);
		this.col = color(random(360), 255, 255);
		this.r = random(3, 7);
	}

	show() {
		fill(this.col);
		ellipse(this.pos.x, this.pos.y, this.r, this.r);
	}

	update() {
		this.yspeed += 0.1;
		this.pos.y += this.yspeed;
	}
}
