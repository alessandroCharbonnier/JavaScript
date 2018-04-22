let qtree;
let points = [];
let inRange = [];
let boundary;
let range;

function setup() {
	createCanvas(windowWidth, windowHeight);
	range = new Rectangle(width / 2, height / 2, 200, 200);
	boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
	qtree = new QuadTree(boundary, 1);
	for (let i = 0; i < 1000; i++) {
		let point = new Point(random(width), random(height));
		qtree.insert(point);
		points.push(point);
	}
}

function draw() {
	background(0);

	for (p of points) {
		p.show(255, 255, 255);
	}

	range = new Rectangle(mouseX, mouseY, 200, 200);
	range.show(255, 0, 0);

	inRange = qtree.query(range);
	for (f of inRange) {
		f.show(255, 0, 0);
	}
	text(floor(frameRate()), 50, 50);
}

function mousePressed() {
	let point = new Point(mouseX, mouseY, 1);
	qtree.insert(point);
	points.push(point);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
	qtree = new QuadTree(boundary, 1);
	for (p of points) {
		qtree.insert(p);
	}
}
