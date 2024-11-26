let angle = 0;
let font;
let textTexture;
let charset = "a" // alternatives: ↑↗→↘↓↙←↖

function preload() {
    font = loadFont("Maax Mono - Bold-205TF.otf");
}

function setup() {
    createCanvas(700, 900, WEBGL);
    background(0);
}

function draw() {

    translate(-width / 2, -height / 2, 0);

    push();

    let oscX = sin(angle);
    let oscY = sin(angle * frameCount) * 0.002;

    let offsetW = map(oscX, -1, 1, 50, width / 2);
    let offsetH = map(oscY, -1, 1, 50, height / 2);

    let mX = map(mouseX, 0, width, 50, width / 2);
    let mY = map(mouseY, 0, height, 50, height / 2);

    drawRect(0, 0, mX + offsetW, mY + offsetH);
    drawRect(mX + offsetW, 0, width - (mX + offsetW), mY + offsetH);
    drawRect(0, mY + offsetH, mX + offsetW, height - (mY + offsetH));
    drawRect(mX + offsetW, mY + offsetH, width - (mX + offsetW), height - (mY + offsetH));
    drawRect(0, height / 2, mX + offsetW, height - (mY + offsetH));
    drawRect(mX + offsetW, height / 2, width - (mX + offsetW), height - (mY + offsetH));
    drawRect(0, mY + height / 2, mX + offsetW, height - (mY + offsetH));
    drawRect(mX + offsetW, mY + height / 2, width - (mX + offsetW), height - (mY + offsetH));

    angle += 0.02;
    pop();
}

function drawRect(x, y, w, h) {
    push();

    translate(x, y);

    randomSeed(frameCount * 0.002);
    let rndmChar = Math.floor(random() * charset.length);

    textTexture = createGraphics(w, h);
    textTexture.textFont(font);
    textTexture.textSize(h);
    textTexture.stroke(0);
    textTexture.strokeWeight(5);
    textTexture.textAlign(CENTER, CENTER);
    textTexture.fill(255);
    textTexture.text(charset[rndmChar], textTexture.width / 2, textTexture.height / 2);

    texture(textTexture);
    box(w, h);

    pop();
}
