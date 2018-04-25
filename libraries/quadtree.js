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
		let d = (point.x - this.x) * (point.x - this.x) + (point.y - this.y) * (point.y - this.y);
		return d <= this.rSquared;
	}

	intersects(range) {
		if (!((range instanceof Rectangle) || (range instanceof Circle))) {
			throw TypeError('make sure to pass to \'intersects\' a Rectangle or Circle type variable');
		}
		let xDist = Math.abs(range.x - this.x);
		let yDist = Math.abs(range.y - this.y);


		let edges = (xDist - range.w) * (xDist - range.w) + (yDist - range.h) * (yDist - range.h);

		// no intersection
		if (xDist > (this.r + range.w) || yDist > (this.r + range.h)) {
			return false;
		}

		// intersection within the circle
		if (xDist <= range.w || yDist <= range.h) {
			return true;
		}

		// intersection on the edge of the circle
		return edges <= this.rSquared;
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
			return true;
		}
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

	query(range, pointsInRange) {
		if (!((range instanceof Rectangle) || (range instanceof Circle))) {
			throw TypeError('make sure to pass to \'query\' a Rectangle or Circle type variable');
		}

		if (!pointsInRange) {
			pointsInRange = [];
		}
		if (!range.intersects(this.boundary)) {
			return pointsInRange;
		}

		for (let p of this.points) {
			if (range.contains(p)) {
				pointsInRange.push(p);
			}
		}
		if (this.divided) {
			this.northWest.query(range, pointsInRange);
			this.northEast.query(range, pointsInRange);
			this.southWest.query(range, pointsInRange);
			this.southEast.query(range, pointsInRange);
		}
		return pointsInRange;
	}
}
