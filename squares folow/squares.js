var squares = [];

class Square {
	constructor() {
		this.r = random(10, 20);
		this.pos = createVector(mouseX, mouseY);
		this.vel = createVector(random(-3, 3), random(-3, 3));
		this.c = color(random(255), random(255), random(255));
	}
	update() {
		this.pos.add(this.vel);
		this.r -= random(1);
	}

	show() {
		fill(this.c);
		rect(this.pos.x, this.pos.y, this.r, this.r);
	}

	kill() {
		for (var i = 0; i < squares.length; i++) {
			if (squares[i].r < 0) {
				squares.splice(i, 1);
				squares.push(new Square());
			}
		}
	}
}
