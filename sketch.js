let texts = [];
var x = 0;
var y = 0;
var speed = 1;
let rt;
let h1;
let clr;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    textFont("Courier New", 25);
    h1 = select('#header');

    clr = color(124, 252, 0)
}

function draw() {
    //textAlign(CENTER);
    fill(clr);
    textSize(random(12, 15));
    
    texts.push("Creative Coding!!");
    texts.push("This is Eric's page!!")
    texts.push("Hello World!!");

    y += speed;
    if(y < height) {
        speed = random(7, 10);
    }

    if(y > height) {
        y = 0;
        x += random(150, 180);
    }
    
    if(x > width) {
        background(0);
        x = 0;
    }

    rt = random(texts);
    text(rt, x, y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function mousePressed() {
    let r = random(180, 255);
    let g = random(120, 200);
    let b = random(10, 60);

    clr = color(r, g, b)
}

