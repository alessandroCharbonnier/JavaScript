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
				console.log("hm.");
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

function writeScore(s, a, n) {
	$.ajax({
		url: 'writeScore.php',
		type: 'POST',
		data: "score=" + s + "&name=" + n + "accuracy=" + a,
		complete: function(resultat, status) {
			console.log(resultat);
			console.log(status);
		}
	});
}

function getAccuracy() {
	if (clicks === 0) {
		return 0.00;
	}
	return (score / clicks * 100).toFixed(2);
}
