class Particule {
	constructor(x, y, c, r) {
		this.pos = createVector(x, y);
		this.a = 255;
		this.vel = createVector(random(-2, 2), random(-2, 2));
		this.col = c;
		this.r = r * 0.6;
	}


	show() {
		fill(this.col, this.a);
		ellipse(this.pos.x, this.pos.y, 3, 3);
	}

	move() {
		this.pos.add(this.vel);
		this.a -= random(1, 9);
	}
}
