function nextGeneration() {
	generation++;

	for (bird of birds) {
		savedBirds.push(bird);
	}
	calculateFitness();

	for (var i = 0; i < TOTAL; i++) {
		birds[i] = pickOne();
	}
	spike.fillSpikes();
	savedBirds = [];
}

function pickOne() {
	let index = 0;
	let r = random(1);
	while (r > 0) {
		r -= savedBirds[index].fitness;
		index++;
	}

	index--;
	let bird = savedBirds[index];
	let child = new Bird(bird.brain);
	child.mutate();
	return child;
}

function calculateFitness() {
	let sum = 0;
	for (bird of savedBirds) {
		sum += bird.score;
	}

	for (bird of savedBirds) {
		bird.fitness = bird.score / sum;
	}
}
