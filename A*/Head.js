function Head() {
  this.run = function() {
    if (openSet.length > 0) {
      this.lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if(openSet[i].f < openSet[this.lowestIndex].f) {
          this.lowestIndex = i;
        }
      }

      this.current = openSet[this.lowestIndex];

      if (this.current === end) {
        noLoop();
        console.log('done!');
        displayGrid();
      }

      removeFrom(openSet, this.current);
      closedSet.push(this.current);

      this.neighbours = this.current.neighbours;
      for (let i = 0; i < this.neighbours.length; i++) {
        this.neighbour = this.neighbours[i];
        if (!closedSet.includes(this.neighbour) && !this.neighbour.wall) {
          this.tempG = this.current.g + 1;

          this.newpath = false;
          if (openSet.includes(this.neighbour)) {
            if (this.tempG < this.neighbour.g) {
              this.neighbour.g = this.tempG;
              this.newpath = true;
            }
          } else {
            this.neighbour.g = this.tempG;
            this.newpath = true;
            openSet.push(this.neighbour);
          }
          if (this.newpath) {
            this.neighbour.h = heuristic(this.neighbour, end);
            this.neighbour.f = this.neighbour.g + this.neighbour.h;
            this.neighbour.previous = this.current;
          }
        }
      }

    }else {
      noLoop();
      console.log("No Solutions");
      displayGrid();
      return;
    }

    this.path = [];
    let temp = this.current;
    this.path.push(temp);
    while (temp.previous) {
      this.path.push(temp.previous);
      temp = temp.previous;
    }

    document.getElementById('length').innerHTML = "this.path length :" + this.path.length;

    //display

    if(document.getElementById('closedSet').checked) {
      displayGrid();
    }

    noFill();
    stroke(0, 0, 255);
    strokeWeight(pathWidth.value());
    beginShape();
    for (var i = 0; i < this.path.length; i++) {
      vertex(this.path[i].x * w + w * 0.5, this.path[i].y * h + h * 0.5)
    }
    endShape();
  }
}
