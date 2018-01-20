function Cell(i, j, w){
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w
	this.neighboorCount = 0;

	if (random(1) < 0.15){
	this.mine = true;
	}else {
		this.mine = false
	}
	this.revealed = false;
}

Cell.prototype.show = function(){
	stroke(0);
	fill(255);
	rect(this.x, this.y, this.w, this.w);
	if (this.revealed) {
		if (this.mine) {
			fill(177);
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
		}else {
			fill(150);
			rect(this.x, this.y, this.w, this.w );
			if (this.neighboorCount > 0){
				textAlign(CENTER);
				fill(0);
				text(this.neighboorCount, this.x + this.w * 0.5, this.y + this.w * 0.5)
			}
		}
	}
}

Cell.prototype.contains = function(x, y){
	return(x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function(x, y){
	this.revealed = true;
	if (this.neighboorCount == 0 && !this.mine){
		this.floodfill();
	}
}

Cell.prototype.countMines = function(){
	if (this.mine){
		return -1;
	}
	var total = 0;
	for(var xoff = -1; xoff <= 1; xoff++){
		for(var yoff = -1; yoff <= 1; yoff++){
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows){
				var neighboor = grid[i][j];
				if (neighboor.mine){
					total++;
				}
			}
		}
	}
	this.neighboorCount = total;
}

Cell.prototype.floodfill = function() {
	for(var xoff = -1; xoff <= 1; xoff++){
		for(var yoff = -1; yoff <= 1; yoff++){
			var i = this.i + xoff;
			var j = this.j + yoff;
			if (i > -1 && i < cols && j > -1 && j < rows){
				var neighboor = grid[i][j];
				if (!neighboor.mine && !neighboor.revealed){
					neighboor.reveal()
				}
			}
		}
	}
}