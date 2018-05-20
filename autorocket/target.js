let t;

class Target {
	constructor() {
		this.pos = createVector(mouseX, mouseY);
	}

	show() {
		this.pos.x = mouseX;
		this.pos.y = mouseY;

		fill(255, 0, 0);
		ellipse(this.pos.x, this.pos.y, 30, 30);
		fill(255);
		ellipse(this.pos.x, this.pos.y, 20, 20);
		fill(255, 0, 0);
		ellipse(this.pos.x, this.pos.y, 10, 10);
	}
}
