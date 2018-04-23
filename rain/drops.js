var drops = []

class Drop {
	constructor() {
		this.x = random(width)
		this.y = random(-height)
		this.yspeed = random(8, 15)
		this.len = random(4, 17)
	}

	fall() {
		this.y += this.yspeed
	}

	show() {
		fill(10, 215, 255, 100)
		noStroke()
		rect(this.x, this.y, 1, this.len)
		if (this.y - this.len > height)
			this.y = random(-height)
	}
}
