let txt;
let name;
let socket;
let panelWidth = 640;
let accuracy = 100.0;
let score = 0;
let clicks = 0;
let ex = false;
let bubbles = [];
let usersNames = [];
let usersScores = [];
let usersAccuracy = [];

function preload() {
	txt = loadStrings("score.txt");
	console.log(txt);
}

function setup() {
	loadScores();
	getHeightScore();
	name = askName();
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < 6; i++) {
		bubbles[i] = new Bubble(i);
	}
	textSize(20);
}

function draw() {
	background(255);
	fill(0);
	noStroke();
	rect((width / 2) - (panelWidth / 2), 0, panelWidth, height);
	for (let i = 0; i < bubbles.length; i++) {
		if (!ex) {
			bubbles[i].move();
			bubbles[i].disp();
		} else {
			textSize(20);
			noLoop();
			accuracy = getAccuracy();
			let data = {
				name: name,
				score: score,
				accuracy: accuracy,
			};
			writeScore(data);
			break;
		}
	}

	fill(0);
	text(score, 10, 45);
	text("accuracy : " + getAccuracy() + "%", 10, 80);
	text("speed :" + bubbles[0].speed.toFixed(3), 10, 115);
}

function mousePressed() {
	clicks++;
	for (let i = 0; i < bubbles.length; i++) {
		bubbles[i].clicked();
	}
}

function keyPressed() {
	clicks++;
	for (let i = 0; i < bubbles.length; i++) {
		bubbles[i].clicked();
	}
}
