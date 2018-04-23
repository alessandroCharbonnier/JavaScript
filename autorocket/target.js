let t;

class Target {
	constructor() {

	}

	show() {
		fill(255, 0, 0);
		ellipse(mouseX, mouseY, 30, 30);
		fill(255);
		ellipse(mouseX, mouseY, 20, 20);
		fill(255, 0, 0);
		ellipse(mouseX, mouseY, 10, 10);
	}
}
