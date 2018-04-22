function Particule(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.show = function() {
		fill(255, 255, 255, 50);
		stroke(255);
		ellipse(this.x, this.y, this.w, this.w);
	}
}
