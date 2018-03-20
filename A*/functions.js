function choseImage() {
  imgNumber = floor(random(0, 3));
  img = loadImage('images/img' + imgNumber + '.png');
}

function setStart() {
  switch (imgNumber) {
    case 0:
      start = grid[513][411];
      end = grid[512][743];
      return ;
    case 1:
      start = grid[1][1];
      end = grid[img.height - 2][img.height - 2];
      return ;
    case 2:
      start = grid[1][1];
      end = grid[534][593];
      return ;
    default:
      console.log('switch statement is wrong');
      noLoop();
    return;
  }
}

function removeFrom(array, element) {
  for(let i = array.length - 1; i >= 0; i--) {
    if (array[i] == element) {
      array.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  let d = abs(a.x - b.x) + abs(a.y - b.y);
  return d;
}

function windowResized() {
  resizeCanvas(img.width, img.height);
}

function displayGrid() {
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0, 5));
  }
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0, 30));
  }
}

function getCurrentTime() {
  let dateStop = new Date;
  let timeStop = dateStop.getTime();
  var millissecs = (timeStop - timeStart) % 1000;
  var seconds = floor((timeStop - timeStart) / 1000);
  var second = floor(seconds % 60);
  var minutes = floor(seconds / 60);
  var hours = floor(minutes / 60);
  return (hours + "H " + minutes + "M " + second + "s " + millissecs + "ms");
}
