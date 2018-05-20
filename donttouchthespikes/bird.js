class Bird {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.vel = createVector(5, 0);
		this.acc = createVector(0, 0);
		this.gravity = createVector(0, 0.8);
		this.img = birdright;
	}

	update() {
		this.acc = this.gravity;
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.edges();
	}

	edges() {
		if (this.pos.x + this.img.width * 0.75 > width || this.pos.x < 0) {
			this.vel.x *= -1;
			score++;
			spike.fillSpikes();
		}
		this.pos.y = constrain(this.pos.y, 0, height - this.img.height * 0.75);
	}

	up() {
		this.vel.x = this.vel.x;
		this.vel.y = -15;
	}

	reset() {
		this.pos = createVector(width / 2, height / 2);
		this.vel = createVector(5, 0);
		this.acc = createVector(0, 0);
		this.img = birdright;
		spike.fillSpikes();
	}

	show() {
		this.img = birdright;
		if (this.vel.x < 0) {
			this.img = birdleft;
		}
		image(this.img, this.pos.x, this.pos.y, this.img.width * 0.75, this.img.height * 0.75);
		// rect(this.pos.x, this.pos.y, this.img.width, this.img.height);
	}
}
