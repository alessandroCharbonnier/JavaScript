function Particule(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.highlight = false;

	this.setHighlight = function(value) {
		this.highlight = value;
	}

	this.move = function() {
		this.x += random(-2, 2) % width;
		this.y += random(-2, 2) % height;
	}

	this.intersects = function(other) {
		return (dist(this.x, this.y, other.x, other.y) < this.r + other.r);
	}

	this.show = function() {
		if (this.highlight) {
			fill(255, 0, 255);
		} else {
			fill(255);
		}
		noStroke();
		ellipse(this.x, this.y, this.r * 2, this.r * 2);
	}
}
