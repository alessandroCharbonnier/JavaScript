let vehicules = [];
const NUMVEHICULES = 40;
const SPAWNGAP = 25;
let vehiculesAlives = NUMVEHICULES;
const generationPeriod = 20;
let generation = new Generation(NUMVEHICULES);
let maxDist;
let interval;

function setup() {
	frameRate(60);
	createCanvas(windowWidth, windowHeight);
	maxDist = dist(0, 0, width, height);
	generation.initialize();
	interval = setTimeout(() => generation.evolve(), 20000);
	// for (let i = 0; i < NUMVEHICULES; i++) {
	// 	vehicules.push(new Vehicule(random(SPAWNGAP, width - SPAWNGAP), random(SPAWNGAP, height - SPAWNGAP)));
	// }
}

function draw() {
	// clear background
	background(0);

	// draw all vehicules
	for (let i = generation.species.length - 1; i >= 0; i--) {
		const vehicule = generation.species[i];
		vehicule.run();
		if (vehiculesAlives < 1) {
			vehiculesAlives = NUMVEHICULES;
			generation.evolve();
			clearInterval(interval);
			interval = setTimeout(() => generation.evolve(), 20000);
		}
	}

	// draw infos
	fill(255);
	noStroke();
	text("fps : " + floor(frameRate()), 10, 30);
	text("Generation: " + generation.generation, 10, 50);
	text("HighScore: " + generation.high_score.toFixed(2), 10, 70);
	text("Average Score " + generation.avg_score.toFixed(2), 10, 90);
	text("Population: " + generation.population, 10, 110);
	text("Generation Period: " + generationPeriod + " seconds", 10, 130);
	text("Mutation Rate: " + 5 + "%", 10, 150);
	text("Progress: " + generation.progress.toFixed(2), 10, 170);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	maxDist = dist(0, 0, width, height);
}
