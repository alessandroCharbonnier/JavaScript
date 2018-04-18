function Spot(x, y, color) {
  this.x = x;
  this.y = y;

  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.color = [];
  this.color = color;
  this.neighbours = [];
  this.previous = undefined;
  this.wall = false;

  if (this.color[1] === 0) {
    this.wall = true;
  }

  this.show = function(col) {
    fill(col);
    noStroke();
    rect(this.x * w, this.y * h, 5, 5);
  }

  this.addneighbours = function(grid) {
    if (this.x < cols - 1) {
      this.neighbours.push(grid[this.x + 1][this.y]);
    }
    if (this.x > 0) {
      this.neighbours.push(grid[this.x - 1][this.y]);
    }
    if (this.y < rows - 1) {
      this.neighbours.push(grid[this.x][this.y + 1]);
    }
    if (this.y > 0) {
      this.neighbours.push(grid[this.x][this.y - 1]);
    }
    if (this.x > 0 && this.y > 0) {
      this.neighbours.push(grid[this.x - 1][this.y - 1]);
    }
    if (this.x < cols - 1 && this.y > 0) {
      this.neighbours.push(grid[this.x + 1][this.y - 1]);
    }
    if (this.x > 0 && this.y < rows - 1) {
      this.neighbours.push(grid[this.x - 1][this.y + 1]);
    }
    if (this.x < cols - 1 && this.y < rows - 1) {
      this.neighbours.push(grid[this.x + 1][this.y + 1]);
    }
  }
}
