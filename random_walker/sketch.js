let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(2);
  background(0);
  frameRate(10);

  
}

function draw() {
    
    //orbitControl();
    //sdrawAxes(200);

    for(let i = 0; i < walkers.length; i++){
        let currentWalker = walkers[i]
        currentWalker.update();
        currentWalker.show();

        // if(currentWalker.alive == false) {
        //     walkers.splice(i, 1);
        // }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

function mousePressed() {

}

function keyPressed() {
    if(key === 's') {
        walkers.push(new Walker())
    }
}

function drawAxes(length) {
    background(0);
    strokeWeight(2);
  
    // X-axis (red)
    stroke(255, 0, 0);  // Set the stroke color to red
    line(0, 0, 0, length, 0, 0);  // Draw a line for the X-axis
  
    // Y-axis (green)
    stroke(0, 255, 0);  // Set the stroke color to green
    line(0, 0, 0, 0, length, 0);  // Draw a line for the Y-axis
  
    // Z-axis (blue)
    stroke(0, 0, 255);  // Set the stroke color to blue
    line(0, 0, 0, 0, 0, length);  // Draw a line for the Z-axis
  }

class Walker {
    constructor() {
        this.fx = mouseX;
        this.fy = mouseY;
        this.fz = 0;
        this.x = this.fx;
        this.y = this.fy;
        this.z = this.fz;
        this.preX = this.x;
        this.preY = this.y;
        this.preZ = this.z;
        this.size = 1;
        this.speed = random(5, 7);
        this.age = 1000;
        this.alive = true;
        this.r = 100;
        this.g = 100;
        this.b = 100;
    }
  
    show() {
        push();
        translate(-width/2, -height/2)
        stroke(random(255));
        fill(255);

        // ellipse(this.x, this.y, this.z, this.size);
        // push();
        // translate(this.x, this.y, this.z);
        // sphere(this.size);
        // pop();

        // strokeWeight(0.05);
        // stroke(this.r, this.g, this.b);
        // line(this.fx, this.fy, this.fz, this.preX, this.preY, this.preZ);
        // line(this.x, this.y, this.z, this.fx, this.fy, this.fz);

        stroke(this.r, this.g, this.b);
        strokeWeight(0.5);
        line(this.x, this.y, this.z, this.preX, this.preY, this.preZ)
        pop();
    }
  
    update() {
        this.preX = this.x;
        this.preY = this.y;
        this.preZ = this.z;

        let rx = random(-this.speed, this.speed);
        let ry = random(-this.speed, this.speed);
        let rz = random(-this.speed, this.speed);

        this.x += rx;
        this.y += ry;
        this.z += rz;

        this.r += random(-10, 10);
        this.g += random(-10, 10);
        this.b += random(-10, 10);

        // this.age --;
        // if(this.age < 0) {
        //     this.alive = false;
        // }

        // if(this.x < 0 || this.x > width) {
        //     this.x  = fx;
        // }else if(this.y < 0 || this.y > height) {
        //     this.y = fy;
        //}
    }
  }
  