let texte;
let textes = [];

function reload() {
	window.location.reload();
}

function revealNext() {
	textes[this.next].display();
	window.scrollTo(0, document.body.scrollHeight);
}

function preload() {
	texte = loadStrings("texte.txt");
}

function setup() {
	let go1 = [];
	let go2 = [];
	let choix1 = [];
	let choix2 = [];
	let paragraphe = [];

	noCanvas();
	for (let i = 0; i < texte.length; i += 5) {
		paragraphe.push(texte[i]);
		choix1.push(texte[i + 1]);
		go1.push(parseInt(texte[i + 2]));
		choix2.push(texte[i + 3]);
		go2.push(parseInt(texte[i + 4]));
	}

	for (let i = 0; i < paragraphe.length; i++) {
		textes.push(new Texte(paragraphe[i], choix1[i], choix2[i], go1[i], go2[i]));
	}
	textes[0].display();
}

function draw() {
	for (var i = 0; i < document.body.children.length; i++) {
		let element = document.body.children[i];
		let x = document.body.children[i].innerHTML;
		if (x == "[object Object]") {
			element.remove();
		}
	}
}
