class Bubble {
	constructor(t) {
		this.d = panelWidth / 5;
		this.r = this.d / 2;
		this.x = random(width / 2 - panelWidth / 2 + panelWidth / 5, width / 2 + panelWidth / 2 - (width / 5));
		this.y = (-height / 5) * t;
		this.speed = 5;
		this.col = color(255);
		this.click = false;
	}

	clicked() {
		let d = dist(mouseX, mouseY, this.x, this.y);
		if (d < this.r && !this.click) {
			this.col = color(255, 0, 255);
			this.click = true;
			score++;
		}
	}

	disp() {
		fill(this.col);
		noStroke();
		if (!this.click) {
			ellipse(this.x, this.y, this.d, this.d);
		}
	}

	move() {
		this.speed *= 1.0003;
		this.y += this.speed;
		if ((this.y > height + this.r) && (this.click)) {
			this.click = !this.click;
			this.x = random(width / 2 - panelWidth / 2 + panelWidth / 5, width / 2 + panelWidth / 2 - (width / 5));
			this.y = (-height / 5);
			this.col = color(255);

		} else if ((this.y > height + this.r) && (!this.click)) {
			ex = true;
			noLoop();
			fill(255, 0, 0);
			textSize(50);
			text("perdu", width / 2 - 100, 100);
			text("score de : " + score, width / 2 - 100, 500);
		}
	}
}