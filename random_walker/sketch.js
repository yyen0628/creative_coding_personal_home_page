let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  background(0);
  frameRate(10);
}

function draw() {

    for(let i = 0; i < walkers.length; i++){
        let currentWalker = walkers[i]
        currentWalker.step();
        currentWalker.show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function mousePressed() {
    //background(0);
    
    walkers.push(new Walker())

}

class Walker {
    constructor() {
        // this.fx = widyh/2;
        // this.fy = height/2;
        //
        this.fx = random(100, width-100);
        this.fy = random(100, height-100);
        this.x = this.fx;
        this.y = this.fy;
        this.preX = this.x;
        this.preY = this.y;
        this.size = 1;
        this.speed = random(8, 12);
    }
  
    show() {
        stroke(random(255));
        fill(255);

        strokeWeight(0.1);
        ellipse(this.x, this.y, this.size);
        line(this.fx, this.fy, this.preX, this.preY);
        line(this.x, this.y, this.fx, this.fy);

        stroke(255)
        strokeWeight(0.5);
        line(this.x, this.y, this.preX, this.preY)
    }
  
    step() {
        this.preX = this.x;
        this.preY = this.y;

        let rx = random(-this.speed, this.speed);
        let ry = random(-this.speed, this.speed);

        this.x += rx;
        this.y += ry;

        // if(this.x < 0 || this.x > width) {
        //     this.x  = fx;
        // }else if(this.y < 0 || this.y > height) {
        //     this.y = fy;
        //}

    //   const choice = floor(random(4));
    //   if (choice == 0) {
    //     this.x += 5;
    //     this.size += 0.05;
    //   } else if (choice == 1) {
    //     this.x -= 5
    //     this.size -= 0.05;
    //   } else if (choice == 2) {
    //     this.y += 5;
    //     this.size += 0.05;
    //   } else {
    //     this.y -= 5;
    //     this.size -= 0.05;
    //   }
    }
  }
  