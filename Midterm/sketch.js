let molds = [];
let molds2 = []
let molds3 = []

let moldSystems = []

let centerX, centerY
let circleRadius = 100

let scl = 20
let inc = 0.04
let zoff = 0

let num = 4000;
let tarNum = 50;

let cols, rows;
let ff, ff2, ff3;

let perlinSystem = [ff, ff2, ff3]

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  //frameRate(20)
  
  cols = floor(width / scl) * 2
  rows = floor(height / scl) *2
  
  ff = new Array(cols * rows);
  ff2 = new Array(cols * rows);
  ff3 = new Array(cols * rows);
  
  centerX = width / 2;
  centerY = height / 2
  
  for (let i = 0; i < num; i++) {
    let angle = random(360);
    let radius = random(circleRadius);
    let x = centerX + cos(angle);
    let y = centerY + sin(angle);
    
    let m = new Mold(x, y, angle);
    molds.push(m);
  }
  
  for (let i = 0; i < num; i++) {
    let angle = random(360);
    let radius = random(circleRadius);
    let x = centerX + cos(angle);
    let y = centerY + sin(angle);
    
    let m = new Mold(x, y, angle);
    molds2.push(m);
  }
  
  for (let i = 0; i < num; i++) {
    let angle = random(360);
    let radius = random(circleRadius);
    let x = centerX + cos(angle);
    let y = centerY + sin(angle);
    
    let m = new Mold(x, y, angle);
    molds3.push(m);
  }
}

function draw() {
  background(0, 10);
  let yoff = 0

  // Perlin Noise direction
  for(let y = 0; y < rows; y ++) {
    let xoff = 0;
    let xoff2 = xoff * random(1.5, 1.8)
    for(let x = 0; x < cols; x ++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 3;
      let angle2 = noise(xoff*1.5, yoff*.5, zoff) * TWO_PI * 4;
      let angle3 = noise(xoff*.4, yoff*.6, zoff) * TWO_PI * 5;
      //let angle = noise(xoff, yoff, zoff) * mouseX / 20;
      let v = p5.Vector.fromAngle(angle);
      let v2 = p5.Vector.fromAngle(angle2);
      let v3 = p5.Vector.fromAngle(angle3);
      
      v.setMag(0.5);
      v2.setMag(0.8);
      v3.setMag(1.6);
      
      ff[index] = v;
      ff2[index] = v2;
      ff3[index] = v3;
      
      xoff += inc
    }
    yoff += inc
    
    zoff += 0.00001
  }
  

  // Mold 
  for (let i = 0; i < molds.length; i++) {
    let mold = molds[i];
    mold.update();
    mold.display("green");
    
    if(mold.g1 == true) {
      mold.follow(ff)
      mold.runPerlin()
    }
  }
  
  if(frameCount > 100)
  for(let j = 0; j < molds2.length; j ++) {
    let m2 = molds2[j];
    m2.update();
    m2.display("red")
    
    if(m2.g2 == true) {
      m2.follow(ff2);
      m2.runPerlin()
    }
  }
  
  if(frameCount > 200)
  for(let j = 0; j < molds3.length; j ++) {
    let m3 = molds3[j];
    m3.update();
    m3.display("white")
    
    if(m3.g3 == true) {
      m3.follow(ff3);
      m3.runPerlin()
    }
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0, 10)
}

// Mold
class Mold {
  constructor(x, y, angle) {
    this.pos = createVector(x, y);
    this.angle = angle;
    this.radius = dist(centerX, centerY, x, y)
    
    //Bouncing spread
    // this.pos = createVector(random(width/2-20, width/2+20),random(height/2-20, height/2+20))
    // this.prevPos = this.pos.copy()
    // this.r = 0.5;
    
    //this.heading = random(360);
    this.vx = cos(this.heading);
    this.vy = sin(this.heading);
    // this.rotateAngle = 30;
    //  this.hitTarget = false;
    this.g1 = false
    this.g2 = false
    this.g3 = false
    
    // Perlin Variable
    this.vel = createVector(0, 0)
    this.acl = createVector(0, 0)
    this.maxSpeed = 2
  }

  update() {
    this.updatePos();
    this.vx = cos(this.angle)/2;
    this.vy = sin(this.angle)/2;

    this.pos.x = (this.pos.x + this.vx + width) % width;
    this.pos.y = (this.pos.y + this.vy + height) % height;
    
    if(frameCount % 1000> 500) {
      this.g1 = true
    }
    if (frameCount % 1000 > 700) {
      this.g2 = true
    }
    if (frameCount % 1000 > 900) {
      this.g3 = true
    }
  }
  
  runPerlin() {
    this.vel.add(this.acl)
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel)
    this.acl.mult(0);
  }
  
  follow(vectors) {
    let x = floor(this.pos.x / scl)
    let y = floor(this.pos.y / scl)
    let index = x + y * cols;
    let force = vectors[index]
    this.applyForce(force);
  }
  
  applyForce(force) {
    this.acl.add(force);
  }
  
  updatePos() {
    this.prevPos = this.pos
  }

  display(_stroke) {
    stroke(_stroke);
    strokeWeight(0.5);
    point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }
}