class Vehicule {
	constructor(x, y, id) {
		this.pos = createVector(x, y);
		this.angle = random(90);
		this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
		this.brain = new NeuralNetwork(4, 1, 1);
		this.r = 5;
		this.intersect = false;
		this.score = 0;
		this.fitness = 0;
		this.parents = [];
		this.id = id;
		this.speed = random(2, 5);
	}

	run() {
		this.update();
		this.draw();
	}

	update() {
		if (this.intersect) {
			return;
		}
		let closest;
		let d = Infinity;
		for (let i = 0; i < generation.species.length; i++) {
			if (this !== generation.species[i]) {
				let temp = dist(this.pos.x, this.pos.y, generation.species[i].pos.x, generation.species[i].pos.y);
				if (temp < d) {
					d = temp;
					closest = generation.species[i];
				}
				if (d < this.r * this.speed) {
					this.intersect = true;
				}
			}
		}

		let c = map(d, 0, maxDist / 10, 255, 0);
		stroke(c, 255 - c, 0);
		line(this.pos.x, this.pos.y, closest.pos.x, closest.pos.y);
		let inputs = [this.pos.x / width, this.pos.y / height, dist(this.pos.x, this.pos.y, closest.pos.x, closest.pos.y) / maxDist, this.angle / 360 /*, closest.angle / 360*/];
		// let inputs = [this.pos.x / width, this.pos.y / height, closest.pos.x / width, closest.pos.y / height, this.angle / 360];

		let output = this.brain.predict(inputs);
		this.angle = output * 360;
		this.vel = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
		this.pos.add(this.vel);

		this.edges();
		this.score++;
	}

	edges() {
		// if (this.pos.x < -this.r) this.pos.x = width;
		// if (this.pos.y < -this.r) this.pos.y = height;
		// if (this.pos.x > width + this.r) this.pos.x = 0;
		// if (this.pos.y > height + this.r) this.pos.y = 0;

		if (this.pos.x < -this.r || this.pos.y < -this.r || this.pos.x > width + this.r || this.pos.y > height + this.r) {
			this.intersect = true;
		}
	}

	clone() {
		let newVehicule = new Vehicule(random(SPAWNGAP, width - SPAWNGAP), random(SPAWNGAP, height - SPAWNGAP), this.id);
		newVehicule.brain.dispose();
		newVehicule.brain = this.brain.clone();
		return newVehicule;
	}

	mutate() {
		function fn(x) {
			if (random(1) < 0.05) {
				let offset = randomGaussian() * 0.5;
				let newx = x + offset;
				return newx;
			}
			return x;
		}

		let ih = this.brain.input_weights.dataSync().map(fn);
		let ih_shape = this.brain.input_weights.shape;
		this.brain.input_weights.dispose();
		this.brain.input_weights = tf.tensor(ih, ih_shape);

		let ho = this.brain.output_weights.dataSync().map(fn);
		let ho_shape = this.brain.output_weights.shape;
		this.brain.output_weights.dispose();
		this.brain.output_weights = tf.tensor(ho, ho_shape);
	}

	crossover(partner) {
		let parentA_in_dna = this.brain.input_weights.dataSync();
		let parentA_out_dna = this.brain.output_weights.dataSync();
		let parentB_in_dna = partner.brain.input_weights.dataSync();
		let parentB_out_dna = partner.brain.output_weights.dataSync();

		let mid = Math.floor(Math.random() * parentA_in_dna.length);
		let child_in_dna = [...parentA_in_dna.slice(0, mid), ...parentB_in_dna.slice(mid, parentB_in_dna.length)];
		let child_out_dna = [...parentA_out_dna.slice(0, mid), ...parentB_out_dna.slice(mid, parentB_out_dna.length)];

		let child = this.clone();
		let input_shape = this.brain.input_weights.shape;
		let output_shape = this.brain.output_weights.shape;

		child.brain.dispose();

		child.brain.input_weights = tf.tensor(child_in_dna, input_shape);
		child.brain.output_weights = tf.tensor(child_out_dna, output_shape);

		return child;
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
