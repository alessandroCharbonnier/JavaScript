function loadScores() {
  for (var i = 0; i < txt.length; i++) {
    switch (i % 3) {
      case 0:
        usersNames.push(txt[i]);
        break;
      case 1:
        usersScores.push(parseInt(txt[i]));
        break;
      case 2:
        usersAccuracy.push(parseInt(txt[i]));
        break;
      default:
        console.log("something went wrong !!!\nHearth will explode soon.");
    }
  }
}

function getHeightScore() {
  let heightscore = -1;
  for (var i = 0; i < usersScores.length; i++) {
    if (usersScores[i] > heightscore) {
      heightscore = usersScores[i];
    }
  }
}

function askName() {
  let name = prompt("type a nickname ...");
  return name;
}

function writeScore(data) {
  let tmp = [];
  tmp[0] = _name;
  tmp[1] = _score.toString();
  tmp[2] = _accuracy.toString();
  console.log("tmp = " + tmp);
  //saveStrings(tmp, "score.txt");
  socket.emit('end', data);
}

function getAccuracy() {
  return (score / clicks * 100).toFixed(2);
}
