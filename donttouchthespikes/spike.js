class Spike {
	constructor() {
		this.spikes = [];
		this.fillSpikes();
		this.gap = this.findGap();
	}

	fillSpikes() {
		let count = 0;
		this.spikes = [];
		for (let i = 0; i < height / bird.img.height; i++) {
			if (random(1) < 0.6) {
				this.spikes[i] = true;
				count++;
			}
		}
		if (count === height / bird.img.height) {
			this.spikes[floor(random(height / bird.img.height + 1))] = false;
		}
	}

	findGap() {
		let i = floor((height / bird.img.height));
		let gap = height - (i * bird.img.height);
		return gap;
	}

	intersect(object) {
		let poly;
		let hit = false;
		for (let i = 0; i < height / bird.img.height; i++) {
			if (this.spikes[i] === true) {
				if (bird.vel.x < 0) {
					poly = [];
					let x1 = 0;
					let y1 = i * bird.img.height + this.gap;
					let x2 = bird.img.height * 0.5;
					let y2 = i * (bird.img.height) + bird.img.height * 0.5;
					let x3 = 0;
					let y3 = (i * bird.img.height) + bird.img.height - this.gap;
					poly[0] = createVector(x1, y1);
					poly[1] = createVector(x2, y2);
					poly[2] = createVector(x3, y3);

					hit = collideRectPoly(object.pos.x, object.pos.y, object.img.width * 0.75, object.img.height * 0.75, poly);
					if (hit) {
						break;
					}
				} else {
					poly = [];
					let x1 = width;
					let y1 = i * bird.img.height + this.gap;
					let x2 = width - bird.img.height * 0.5;
					let y2 = i * (bird.img.height) + bird.img.height * 0.5;
					let x3 = width;
					let y3 = (i * bird.img.height) + bird.img.height - this.gap;
					poly[0] = createVector(x1, y1);
					poly[1] = createVector(x2, y2);
					poly[2] = createVector(x3, y3);

					hit = collideRectPoly(object.pos.x, object.pos.y, object.img.width * 0.75, object.img.height * 0.75, poly);
					if (hit) {
						break;
					}
				}
			}
		}
		return hit;
	}

	show() {
		for (let i = 0; i < height / bird.img.height; i++) {
			if (this.spikes[i] === true) {
				if (bird.vel.x < 0) {
					fill(0);
					noStroke();
					let x1 = 0;
					let y1 = i * bird.img.height + this.gap;
					let x2 = bird.img.height * 0.5;
					let y2 = i * (bird.img.height) + bird.img.height * 0.5;
					let x3 = 0;
					let y3 = (i * bird.img.height) + bird.img.height - this.gap;
					triangle(x1, y1, x2, y2, x3, y3);
				} else {
					fill(0);
					noStroke();
					let x1 = width;
					let y1 = i * bird.img.height + this.gap;
					let x2 = width - bird.img.height * 0.5;
					let y2 = i * (bird.img.height) + bird.img.height * 0.5;
					let x3 = width;
					let y3 = (i * bird.img.height) + bird.img.height - this.gap;
					triangle(x1, y1, x2, y2, x3, y3);
				}
			}
		}
	}
}
