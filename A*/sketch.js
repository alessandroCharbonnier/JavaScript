let cols = 50;
let rows = 50;
let w, h;
let grid = new Array(cols);
let path = [];

let openSet = [];
let closedSet = [];
let start;
let end;
let current;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }else {
    createCanvas(windowWidth, windowWidth);
  }
  w = width / cols;
  h = height / rows;

  //make 2D array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array();
  }

  //adding spots to the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

function draw() {

  if (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if(openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    current = openSet[lowestIndex];

    if (current === end) {
      noLoop();
      console.log('done!');
    }

    removeFrom(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;

        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }

  }else {
    console.log("No Solutions");
    noLoop();
    return;
  }

  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // for (let i = 0; i < openSet.length; i++) {
  //   openSet[i].show(color(0, 255, 0));
  // }
  //
  // for (let i = 0; i < closedSet.length; i++) {
  //   closedSet[i].show(color(255, 0, 0));
  // }

  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  noFill();
  stroke(0, 0, 255);
  strokeWeight(5);
  beginShape();
    for (var i = 0; i < path.length; i++) {
      vertex(path[i].x * w + w * 0.5, path[i].y * h + h * 0.5)
    }
  endShape();

}
