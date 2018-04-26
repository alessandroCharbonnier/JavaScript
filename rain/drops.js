var drops = []

class Drop {
	constructor() {
		this.gravity = createVector(0, 0.12);
		this.pos = createVector(random(width), random(-2*height, 0))
		this.speed = createVector(0, random(4, 10));
		this.acc = createVector(0, 0);
		this.len = 0;
	}

	fall() {
		this.acc.add(this.gravity)
		this.speed.add(this.acc);
		this.pos.add(this.speed);
		this.acc.mult(0);
		this.len = map(this.speed.y, 0.12, 15, 4, 17);
		if (this.pos.y > height) {
			this.pos.y = -height;
			this.speed = createVector(0, random(4, 10));;
		}
	}

	show() {
		rect(this.pos.x, this.pos.y, 1, this.len);
	}
}
