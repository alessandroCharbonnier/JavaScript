let particules = [];

class Particule {
	constructor() {
		this.pos = createVector(random(1, width), random(1, height));
		this.vel = createVector();
	}

	update() {
		this.pos.add(this.vel);
	}

	applyforce() {
		let pospixel = round(this.pos.x * this.pos.y);
		this.vel = pixelvector[pospixel].copy();
	}

	edges() {
		if (this.pos.x > width - 1) {
			this.pos.x = 1;
		} else if (this.pos.x < 1) {
			this.pos.x = width - 1;
		}
		if (this.pos.y > height - 1) {
			this.pos.y = 1;
		} else if (this.pos.y < 1) {
			this.pos.y = height - 1;
		}
	}
	show() {
		stroke(0, 30);
		point(this.pos.x, this.pos.y);
	}
}
