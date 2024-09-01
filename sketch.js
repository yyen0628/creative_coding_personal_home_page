let cc = "Cool Coding!";
var x = 0;
var y = 0;
var speed = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    textFont("Courier New", 25);
}

function draw() {

    textAlign(CENTER);
    fill(124, 252, 0);
    textSize(12);
    text(cc, x, y);

    y += speed;
    if(y < height) {
        speed = random(5, 10);
    }
    if(y > height) {
        y = 0;
        x += random(90, 120);
    }

    if(x > width) {
        background(0);
        x = 0;
    }

    console.log(speed);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function randomBg() {
    var r = random(50, 150);
    var g = random(30, 120);
    var b = random(120, 255);
    background(r, g, b);
}

