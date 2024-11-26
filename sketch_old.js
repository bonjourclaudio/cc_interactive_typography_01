let charset = "&";
let font;

function preload() {
  font = loadFont('Maax Mono - Bold-205TF.otf'); // Make sure the font is properly loaded
}

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);
  background("blue");


  stroke(0);
  strokeWeight(1);
  textFont(font);
  textSize(128);
  textAlign(CENTER, CENTER);
}

function draw() {

  translate(width / 2, height / 2, 0)
  push()

  // Loop to place the character at multiple points
  for (let i = 0; i < 100; i++) {
    let osc = map(sin(radians(frameCount * 0.8 + i)), -1, 1, -500, 500);
    let osc2 = map(cos(radians(frameCount + i)), -1, 1, -500, 500);
    let c = map(sin(radians(frameCount + i)), -1, 1, 255, 0)

    push();
    translate(osc, osc2, 0);
    fill(c);
    text(charset, 0, 0);
    pop();
  }
  pop()
}