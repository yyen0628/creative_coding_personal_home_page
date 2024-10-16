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

    // if(p.alive == false) {
    //     particles.splice(i, 1);
    // }

    if(particles.length <= 0) {
        particles.push(new Particle());
    }

    for(let j = 0; j < particles.length; j++) {
      
      let p2 = particles[j]
      
      let distance = p5.Vector.dist(p.pos, p2.pos);
    
      // should i draw a connecting line
      if(distance < 200 && p.pos != p2.pos) {
        
        let alpha = map(distance, 100, 0, 0, 255)
        stroke(255, alpha);
        line(p.pos.x, p.pos.y, p2.pos.x, p2.pos.y)
      }
    }
    
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
    this.vel = createVector(random(-5, 5), random(-3, 3));
    this.accel = createVector(random(-0.06, 0.06), random(-0.02, 0.02));
    this.size = random(5, 10);
    this.alive = true;
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
    this.color = map(this.age, 500, 0, 255, 10);
  }
  
  show() {
    noStroke();
    //fill(this.colorR, this.colorG, this.colorB);
    fill(255, this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  
  checkWalls() {
    // check top wall
    if(this.pos.y < this.size/2) {
      this.vel.y *= -1; // reverse the y direction (if it's negative, it becomes positive, and vice versa)
      this.pos.y = this.size/2;
      this.alive = false;
    }
    
    // check bottom wall
    if(this.pos.y > height - this.size/2) {
      
      this.vel.y *= -1;
      this.pos.y = height - this.size/2;
      this.alive = false;
    }
    
    // check left wall
    if(this.pos.x < this.size/2) {
      this.vel.x *= -1;
      this.pos.x = this.size/2;
      particles.push(new Particle());
    }
    
    // check right wall
    if(this.pos.x > width - this.size/2) {
      this.vel.x *= -1;
      this.pos.x = width - this.size/2;
      particles.push(new Particle());
    }
  }
}

