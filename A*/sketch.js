let cols;
let rows;
let w, h;
let grid = new Array(cols);
let path = [];

let openSet = [];
let closedSet = [];
let start;
let end;
let current;

let img;
let pathWidth;
let displayClosedSet;
let imgNumber;

let dateStart = new Date;
let timeStart = dateStart.getTime();

function preload() {
  choseImage();
}

function setup() {
  createCanvas(img.width, img.height);

  pathWidth = createSlider(1, 4, 2);

  rectMode(CENTER);

  cols = img.width;
  rows = img.height;
  w = width / cols;
  h = height / rows;

  //make 2D array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array();
  }

  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      grid[i][j] = new Spot(i, j, img.get(i, j));
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  setStart();

  start.wall = false;
  end.wall = false;

  openSet.push(start);
  dateStart.getTime();
}

function draw() {

  if (document.getElementById('time').checked) {
    document.getElementById('pTime').innerHTML = getCurrentTime();
  }

  if (document.getElementById('fps').checked) {
    document.getElementById('pfps').innerHTML = floor(frameRate());
  }

  if (openSet.length > 0) {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if(openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }

    current = openSet[lowestIndex];

    if (current === end) {
      console.log('done!');
      displayGrid();
      noLoop();
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
    displayGrid();
    noLoop();
    return;
  }

  path = [];
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  //display

  image(img, 0, 0);

  if(document.getElementById('closedSet').checked) {
    displayGrid();
  }

  noFill();
  stroke(0, 0, 255);
  strokeWeight(pathWidth.value());
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].x * w + w * 0.5, path[i].y * h + h * 0.5)
  }
  endShape();

  start.show(color(255, 0, 0));
  end.show(color(255, 0, 0));

}
