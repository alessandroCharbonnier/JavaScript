function Spot(x, y) {
  this.x = x;
  this.y = y;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;

  if (random(1) < 0.35) {
    this.wall = true;
  }

  this.show = function(col) {
    fill(col);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.x*w, this.y*h, w-1, h-1);
  }

  this.addNeighbors = function(grid) {
    if (this.x < cols - 1) {
      this.neighbors.push(grid[this.x + 1][this.y]);
    }
    if (this.x > 0) {
      this.neighbors.push(grid[this.x - 1][this.y]);
    }
    if (this.y < rows - 1) {
      this.neighbors.push(grid[this.x][this.y + 1]);
    }
    if (this.y > 0) {
      this.neighbors.push(grid[this.x][this.y - 1]);
    }
  }
}
