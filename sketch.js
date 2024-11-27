let angle = 0;
let font;
let textTexture;
let charset = "a"; // Alternatives: ↑↗→↘↓↙←↖
let layerCount = 0;

function preload() {
    font = loadFont("./assets/Maax Mono - Bold-205TF.otf");
}

function setup() {
    createCanvas(700, 900, WEBGL);
    background(0);
}

function draw() {

    // Adjust coordinates for WEBGL
    translate(-width / 2, -height / 2, 0);

    push();

    // Oscillator for the offset of the rectangles
    let oscX = sin(angle);
    let oscY = sin(angle * frameCount) * 0.002;

    // Map the oscillator values to the offset of the rectangles
    let offsetW = map(oscX, -1, 1, 50, width / 2);
    let offsetH = map(oscY, -1, 1, 50, height / 2);

    // Manipulate size of rects through mouse position
    let mX = map(mouseX, 0, width, 50, width / 2);
    let mY = map(mouseY, 0, height, 50, height / 2);

    // Draw the rectangles
    drawRect(0, 0, mX + offsetW, mY + offsetH);
    drawRect(mX + offsetW, 0, width - (mX + offsetW), mY + offsetH);
    drawRect(0, mY + offsetH, mX + offsetW, height - (mY + offsetH));
    drawRect(mX + offsetW, mY + offsetH, width - (mX + offsetW), height - (mY + offsetH));
    drawRect(0, height / 2, mX + offsetW, height - (mY + offsetH));
    drawRect(mX + offsetW, height / 2, width - (mX + offsetW), height - (mY + offsetH));
    drawRect(0, mY + height / 2, mX + offsetW, height - (mY + offsetH));
    drawRect(mX + offsetW, mY + height / 2, width - (mX + offsetW), height - (mY + offsetH));

    // Increase angle for the oscillator
    angle += 0.02;

    pop();


    layerCount++;

    // Draw a black overlay after 100 layers for performance optimization
    if (layerCount > 100) {
        push();
        noStroke();
        fill(0, 10);
        rect(-width / 2, -height / 2, width, height);
        pop();
    }
}

function drawRect(x, y, w, h) {
    push();

    translate(x, y);


    // Choose random character of defined charset
    randomSeed(frameCount * 0.002);
    let rndmChar = Math.floor(random() * charset.length);

    // Apply text to the shape as texture
    // since basic text() glitches in WEBGL
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
