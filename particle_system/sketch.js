let particles = [];

function setup() {
    
  createCanvas(windowWidth, windowHeight);

    let p = new Particle();
    particles.push(p);

  pixelDensity(5);
  frameRate(30);
}

function draw() {
    background(0);
  
  for(let i = 0; i < particles.length; i ++) {
    let p = particles[i];
    p.update();
    p.show();

    if(particles.length <= 0) {
        particles.push(new Particle());
    }
  }
  console.log(particles.length);
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
    this.vel = createVector(random(-5, 5), random(-3, 3));
    this.accel = createVector(random(-0.05, 0.05), random(-0.03, 0.03));
    this.size = random(30, 50)
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
    this.colorR = map(this.pos.x, width, 0, 255, 0);
    this.colorG = map(this.pos.y, height, 0, 255, 0);
    this.colorB = this.vel.x * 50;
    this.color = map(this.age, 500, 0, 255, 10);
  }
  
  show() {
    noStroke();
    //fill(this.colorR, this.colorG, this.colorB);
    fill(255, this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
  checkWalls() {
    if(this.pos.x < 0 || this.pos.x > width) {
        this.vel.x *= -1;
        particles.push(new Particle());
      }
      
      
      if(this.pos.y < 0 || this.pos.y > height) {
        this.vel.y *= -1;
        particles.length --;
      }
  }
}

