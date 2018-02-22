let texte;
let textes = [];

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
  for (let i = 0; i < texte.length; i++) {
    switch(i % 5) {
      case 0:
        paragraphe.push(texte[i]);
        break;
      case 1:
        choix1.push(texte[i]);
        break;
      case 2:
        go1.push(parseInt(texte[i]));
        break;
      case 3:
        choix2.push(texte[i]);
        break;
      case 4:
        go2.push(parseInt(texte[i]));
        break;
      default:
      console.log("something went wrong !!!\n");
    }
  }
  for (let i = 0; i < paragraphe.length; i++) {
    textes.push(new Texte(paragraphe[i], choix1[i], choix2[i], go1[i], go2[i]));
  }
  textes[0].display();
  console.log(document.getElementsByTagName("p"));
}
