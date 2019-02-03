class Vehicule {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.angle = random(90);
		this.vel = createVector(cos(this.angle) * 1.5, sin(this.angle) * 1.5);
		this.brain = new NeuralNetwork(4, 5, 1);
		this.r = 5;
		this.intersect = false;
	}

	update() {
		if (this.intersect === true) {
			return;
		}
		let closest;
		let d = Infinity;
		for (let i = 0; i < vehicules.length; i++) {
			if (this !== vehicules[i]) {
				let temp = dist(this.pos.x, this.pos.y, vehicules[i].pos.x, vehicules[i].pos.y);
				if (temp < d) {
					d = temp;
					closest = vehicules[i];
				}
				if (d < this.r * 3) {
					this.intersect = true;
				}
			}
		}

		let inputs;
		if (closest) {
			let c = map(d, 0, maxDist / 10, 255, 0);
			stroke(c, 255 - c, 0);
			line(this.pos.x, this.pos.y, closest.pos.x, closest.pos.y);
			inputs = [this.pos.x / width, this.pos.y / height, dist(this.pos.x, this.pos.y, closest.pos.x, closest.pos.y) / maxDist, this.angle / 360];
		} else {
			// the distance to the closest should be at its maximum
			inputs = [this.pos.x / width, this.pos.y / height, 1, this.angle / 360];
		}

		let output = this.brain.predict(inputs);
		this.angle = output * 360;
		this.vel = createVector(cos(this.angle) * 1.5, sin(this.angle) * 1.5);
		this.pos.add(this.vel);

		this.edges();
	}

	edges() {
		if (this.pos.x < -this.r || this.pos.y < -this.r || this.pos.x > width + this.r || this.pos.y > height + this.r) {
			this.intersect = true;
		}
	}

	draw() {
		if (this.intersect) {
			fill(255, 0, 0);
			stroke(200);
		} else {
			fill(127);
			stroke(200);
		}
		strokeWeight(1);

		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading() + PI / 2);
		beginShape();
		vertex(0, -this.r);
		vertex(-this.r, this.r * 2);
		vertex(this.r, this.r * 2);
		endShape(CLOSE);
		pop();
	}
}
