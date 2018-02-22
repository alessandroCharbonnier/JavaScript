function Texte(texte, choise1, choise2, goto1, goto2) {
  this.p = texte;
  this.c1 = choise1;
  this.c2 = choise2;
  this.goto1 = goto1 - 2;
  this.goto2 = goto2 - 2;
  
  this.display = function() {
    this.p = createP(this.p).addClass('para');
    if(this.c1 != 'NULL') {
      if(this.goto1 != -3) {
        this.c1 = createButton(this.c1);
        this.c1.addClass('button');
        this.c1.mousePressed(revealNext);
        this.c1.next = this.goto1;
      }else {
        this.c1 = createButton(this.c1).addClass('end');
        this.c1.mousePressed(reload);
      }
    }
    if(this.c2 != 'NULL') {
      this.c2 = createButton(this.c2);
      this.c2.addClass('button');
      this.c2.mousePressed(revealNext);
      this.c2.next = this.goto2;
    } 
  }

  
}

function reload() {
  window.location.reload();
}

function revealNext() {
  textes[this.next].display();
  window.scrollTo(0,document.body.scrollHeight);
}