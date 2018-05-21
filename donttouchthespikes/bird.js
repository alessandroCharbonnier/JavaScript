class Bird {
	constructor(brain) {
		this.pos = createVector(width / 2, height / 2);
		this.vel = createVector(5, 0);
		this.acc = createVector(0, 0);
		this.gravity = createVector(0, 0.8);
		this.img = birdright;
		this.time = 0;
		this.score = 0;
		this.points = 0;
		this.fitness = 0;
		if (brain) {
			this.brain = brain.copy();
		} else {
			this.brain = new NeuralNetwork(6, 6, 2);
		}
	}

	think() {
		let inputs = [];
		let p = findHoll();
		inputs[0] = p.x / width;
		inputs[1] = p.y / height;
		inputs[2] = this.pos.x / width;
		inputs[3] = this.pos.y / height;
		inputs[4] = map(this.vel.x, -5, 5, 0, 1);
		inputs[5] = map(this.vel.y, -20, 20, 0, 1);

		let outputs = this.brain.predict(inputs);
		if (outputs[0] > outputs[1]) {
			this.up();
		}
	}

	update() {
		this.time;
		doYouKnowDaWae = this.vel.x;
		this.acc = this.gravity;
		this.vel.add(this.acc);
		this.vel.y = constrain(this.vel.y, -20, 20);
		this.pos.add(this.vel);
	}

	edges() {
		this.pos.x = constrain(this.pos.x, 0, width - this.img.width * 0.75);
		this.pos.y = constrain(this.pos.y, 0, height - this.img.height * 0.75);
		if (this.pos.x + this.img.width * 0.75 >= width || this.pos.x <= 0) {
			this.vel.x *= -1;
			doYouKnowDaWae = this.vel.x;
			this.points++;
			return true;
		}
		return false;
	}

	up() {
		this.vel.x = this.vel.x;
		this.vel.y = -15;
	}

	mutate() {
		this.brain.mutate(0.1);
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
	}
}
