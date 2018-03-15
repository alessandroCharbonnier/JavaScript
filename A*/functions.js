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
  if (windowWidth > windowHeight) {
    resizeCanvas(windowHeight, windowHeight);
  }else {
    resizeCanvas(windowWidth, windowWidth);
  }
  w = width / cols;
  h = height / rows;
}
