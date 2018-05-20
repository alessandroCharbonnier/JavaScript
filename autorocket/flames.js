class Flame {
	constructor(x, y) {
		this.r = 255;
		this.pos = createVector(x, y);
		this.vel = createVector(random(-1, 1), random(-1, 1));
	}

	update() {
		this.pos.add(this.vel);
		this.r -= 50;
	}

	show() {
		this.c = color(255, this.r, 0);
		fill(this.c);
		rect(this.pos.x, this.pos.y, 5, 5);
	}

	kill() {
		if (this.r < 0) {
			let index = rocket.flames.indexOf(this);
			rocket.flames.splice(index, 1);
			rocket.flames.push(new Flame(rocket.pos.x, rocket.pos.y));
		}
	}
}
