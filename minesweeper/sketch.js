function makeArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++){
  arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 25;

function setup() {
  createCanvas(windowHeight, windowHeight);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = makeArray(cols, rows);
  for (var i = 0; i < cols; i++){
  	for (var j = 0; j < rows; j++){
  	  grid[i][j] = new Cell(i, j, w);
  	}
  }

  for (var i = 0; i < cols; i++){
  	for (var j = 0; j < rows; j++){
  	  grid[i][j].countMines();
  	}
  }
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++){
  	for (var j = 0; j < rows; j++){
  	  grid[i][j].show();
  	}
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
  	for (var j = 0; j < rows; j++) {
  	  if(grid[i][j].contains(mouseX, mouseY)){
  	  	grid[i][j].reveal();
  	  }
      if (grid[i][j].contains(mouseX, mouseY) && grid[i][j].mine) {
        revealmines();
      }
  	}
  }
}

function revealmines() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].mine) {
        grid[i][j].revealed = true;
      }
    }
  }
  noLoop();
}