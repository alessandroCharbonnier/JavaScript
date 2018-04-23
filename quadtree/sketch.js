let qtree;
let particules = [];
let inRange = [];
let boundary;

function setup() {
	createCanvas(windowWidth, windowHeight);
	boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
	qtree = new QuadTree(boundary, 5);
	for (let i = 0; i < 1000; i++) {
		let particule = new Particule(random(width), random(height), random(3, 5));
		particules.push(particule);
	}
}

function draw() {
	background(0);
	qtree = new QuadTree(boundary, 5);
	for (p of particules) {
		qtree.insert(new Point(p.x, p.y, p));
		p.move();

		let range = new Circle(p.x, p.y, p.r * 2)
		let inRange = qtree.query(range);
		for (pp of inRange) {
			let other = pp.userData;
			if (p !== other && p.intersects(other)) {
				p.setHighlight(true);
				other.setHighlight(true);
			}
		}
		p.show();
		p.setHighlight(false);
	}
	fill(0, 255, 0);
	text(floor(frameRate()), 50, 50);
}

function mousePressed() {
	let particule = new Particule(mouseX, mouseY, random(3, 5));
	qtree.insert(new Point(particule.x, particule.y, particule));
	particules.push(particule);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
	qtree = new QuadTree(boundary, 5);
	for (p of particules) {
		qtree.insert(p);
	}
}
