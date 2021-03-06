let bubbles = []

class Bubble {

	constructor() {
		this.r = random(30, 100);
		this.x = random(this.r, width - this.r);
		this.y = random(this.r, height - this.r);
		this.a = random(230);
		this.xspeed = random(-4, 4);
		this.yspeed = random(-4, 4);
	}


	move() {
		this.x += this.xspeed;
		this.y += this.yspeed;
	}

	show() {
		stroke(255, this.a);
		noFill();
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}

	edges() {
		if (this.x - this.r < 0 || this.x + this.r > width) {
			this.xspeed *= -1;
		}
		if (this.y - this.r < 0 || this.y + this.r > height) {
			this.yspeed *= -1;
		}
	}
}
