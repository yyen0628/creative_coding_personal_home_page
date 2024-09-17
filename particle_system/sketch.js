let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
    let p = new Particle();
    particles.push(p);

  pixelDensity(2);
}

function draw() {
  background(0);
  
  for(let i = 0; i < particles.length; i ++) {
    let p = particles[i];
    p.update();
    p.show();
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.age = 500;
    this.c = 1;
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.accel = createVector(random(-0.03, 0.03), random(-0.03, 0.03));
    
  }
  
  update() {
    // this.x += this.velX;
    // this.y += this.velY;
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    this.checkWalls();
    this.age -= this.c;
    if(this.age < 0 || this.age >= 500) {
        this.c *= -1
    }
    this.color = map(this.age, 500, 0, 255, 0);
    this.size = map(this.age, 500, 0, 50, 0);
  }
  
  show() {
    noStroke();
    fill(this.color, random(255), random(255));
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
  checkWalls() {
    if(this.pos.x < 0 || this.pos.x > width) {
        this.vel.x *= -1;
      }
      
      if(this.pos.y < 0 || this.pos.y > height) {
        this.vel.y *= -1;
        //this.size += 1;
      }
  }
}

