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
let heads = [];

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
      grid[i][j].addneighbours(grid);
    }
  }

  setStart();

  start.wall = false;
  end.wall = false;

  openSet.push(start);
  dateStart.getTime();

  for (var i = 0; i < 50; i++) {
    heads.push(new Head());
  }
}

function draw() {

  if (document.getElementById('time').checked) {
    document.getElementById('pTime').innerHTML = getCurrentTime();
  }

  if (document.getElementById('fps').checked) {
    document.getElementById('pfps').innerHTML = floor(frameRate());
  }

  image(img, 0, 0);

  for (head of heads) {
    head.run();
    document.getElementById('length').innerHTML = "this.path length :" + head.path.length;
  }

  if(document.getElementById('closedSet').checked) {
    displayGrid();
  }

  start.show(color(255, 0, 0));
  end.show(color(255, 0, 0));
}
