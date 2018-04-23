let squares = []

class Square {
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
		for (let i = squares.length - 1; i >= 0; i--) {
			if (squares[i].r < 0) {
				squares.splice(i, 1);
				squares.push(new Square(rocket.pos.x, rocket.pos.y));
			}
		}
	}
}
