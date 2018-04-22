class Point {
	constructor(x, y, userData) {
		if (typeof x !== 'number') {
			throw TypeError(`element.x should be a number but is a ${typeof element.x}`);
		}
		if (typeof y !== 'number') {
			throw TypeError(`element.y should be a number but is a ${typeof element.y}`);
		}

		this.x = x;
		this.y = y;
		if (userData) {
			this.userData = userData;
		}
	}

	show(r, g, b) {
		noStroke();
		fill(r, g, b);
		ellipse(this.x, this.y, 4, 4);
	}
}

class Circle {
	constructor(x, y, r) {
		if (typeof x !== 'number') {
			throw TypeError(`x should be a number but is a ${typeof x}`);
		}
		if (typeof y !== 'number') {
			throw TypeError(`y should be a number but is a ${typeof y}`);
		}
		if (typeof r !== 'number') {
			throw TypeError(`r should be a number but is a ${typeof r}`);
		}
		this.x = x;
		this.y = y;
		this.r = r;
		this.rSquared = this.r * this.r;
	}

	contains(point) {
		if (!(point instanceof Point)) {
			throw TypeError('make sure to pass to \'contains\' a Point type variable');
		}
		point.show(0, 0, 255);
		let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
		return d <= this.rSquared;
	}

	intersects(range) {
		if (!((range instanceof Rectangle) || (range instanceof Circle))) {
			throw TypeError('make sure to pass to \'intersects\' a Rectangle or Circle type variable');
		}
		let xDist = Math.abs(range.x - this.x);
		let yDist = Math.abs(range.y - this.y);


		let edges = Math.pow((xDist - range.w), 2) + Math.pow((yDist - range.h), 2);

		// no intersection
		if (xDist > (this.r + range.w) || yDist > (this.r + range.h))
			return false;

		// intersection within the circle
		if (xDist <= range.w || yDist <= range.h)
			return true;

		// intersection on the edge of the circle
		return edges <= this.rSquared;
	}

	show(r, g, b) {
		noFill();
		stroke(r, g, b);
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}

class Rectangle {
	constructor(x, y, w, h) {
		if (typeof x !== 'number') {
			throw TypeError(`x should be a number but is a ${typeof x}`);
		}
		if (typeof y !== 'number') {
			throw TypeError(`y should be a number but is a ${typeof y}`);
		}
		if (typeof w !== 'number') {
			throw TypeError(`w should be a number but is a ${typeof w}`);
		}
		if (typeof h !== 'number') {
			throw TypeError(`h should be a number but is a ${typeof h}`);
		}
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	contains(point) {
		if (!(point instanceof Point)) {
			throw TypeError('make sure to pass to \'contains\' a Point type variable');
		}
		point.show(0, 0, 255);
		return (point.x >= this.x - this.w &&
			point.x <= this.x + this.w &&
			point.y >= this.y - this.h &&
			point.y <= this.y + this.h);
	}

	intersects(range) {
		if (!((range instanceof Rectangle) || (range instanceof Circle))) {
			throw TypeError('make sure to pass to \'intersects\' a Rectangle or Circle type variable');
		}
		return !(range.x - range.w > this.x + this.w ||
			range.x + range.w < this.x - this.w ||
			range.y - range.h > this.y + this.h ||
			range.y + range.h < this.y - this.h);
	}

	show(r, g, b) {
		noFill();
		stroke(r, g, b);
		rectMode(CENTER);
		rect(this.x, this.y, this.w * 2, this.h * 2);
	}
}

class QuadTree {
	constructor(boundary, capacity) {
		if (!boundary) {
			throw TypeError('boundary is null or undefined');
		}
		if (!(boundary instanceof Rectangle)) {
			throw TypeError('boundary should be a Rectangle');
		}
		if (!capacity) {
			throw TypeError('boundary is null or undefined');
		}
		if (typeof capacity !== 'number') {
			throw TypeError(`capacity should be a number but is a ${typeof capacity}`);
		}
		if (capacity < 1) {
			throw RangeError('capacity must be greater than 0');
		}
		this.boundary = boundary;
		this.capacity = capacity;
		this.points = [];
		this.divided = false;
		this.length = 0;
	}

	subdivide() {
		this.northWest = new QuadTree(new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2), this.capacity);
		this.northEast = new QuadTree(new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2), this.capacity);
		this.southWest = new QuadTree(new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2), this.capacity);
		this.southEast = new QuadTree(new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2), this.capacity);
		this.divided = true;
	}

	insert(point) {
		if (!(point instanceof Point)) {
			throw TypeError('make sure to pass to \'insert\' a Point type variable');
		}
		if (!this.boundary.contains(point)) {
			return false;
		}

		if (this.points.length < this.capacity) {
			this.points.push(point);
			this.length++;
			console.log(this.size());
			return true;
		} else {
			if (!this.divided) {
				this.subdivide();
			}
			return (
				this.northWest.insert(point) ||
				this.northEast.insert(point) ||
				this.southWest.insert(point) ||
				this.southEast.insert(point)
			);
		}
	}

	query(range, founds) {
		if (!((range instanceof Rectangle) || (range instanceof Circle))) {
			throw TypeError('make sure to pass to \'query\' a Rectangle or Circle type variable');
		}

		if (!founds) {
			founds = [];
		}
		if (!range.intersects(this.boundary)) {
			return founds;
		}

		for (let p of this.points) {
			if (range.contains(p)) {
				founds.push(p);
			}
		}
		if (this.divided) {
			this.northWest.query(range, founds);
			this.northEast.query(range, founds);
			this.southWest.query(range, founds);
			this.southEast.query(range, founds);
		}
		return founds;
	}

	size() {
		return this.length;
	}

	show(r, g, b) {
		noFill();
		stroke(r, g, b);
		rectMode(CENTER);
		rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
		if (this.divided) {
			this.northWest.show();
			this.northEast.show();
			this.southWest.show();
			this.southEast.show();
		}
	}
}
