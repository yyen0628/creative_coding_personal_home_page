let rects = [];
let cir;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for(let i = 0; i < 200; i ++) {
    let r = new Rect(random(width), random(height), random(10, 50), random(10, 50))
    rects.push(r)
  }
  
  cir = new circleObj(20)
}

function draw() {
  background(0, 5);
  
  for(let i = 0; i < rects.length; i ++) {
    let r = rects[i]
    r.collide(cir);
    r.display()
    r.update()
  }
  
  cir.display(mouseX, mouseY);
}

function windowResized() {
  background(0);
  resizeCanvas(windowWidth, windowHeight)
}

class Rect {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w;
    this.h = h;
    this.vx = random(-1, 1)
    this.vy = random(-1, 1)
    this.ax = 0
    this.ay = 0
    //this.maxSpeed = random(-1.5, 1.5)
    this.clr = color(random(255), random(255), random(255))
    
    this.hit = false;
  }
  
  update() {
    this.x += this.vx
    this.y += this.vy
    
    this.vx += this.ax
    this.vy += this.ay
    
    this.edges()
  }
  
  display() {
    noStroke();
    fill(this.clr);
    rect(this.x, this.y, this.w, this.h)
  }
  
  collide(obj) {
    this.hit = collideRectCircle(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.dia)
    
    if(this.hit == true) {
      //this.clr = color(0)
      this.vx *= -1
      this.vy *= -1
      // this.ax = random(-0.05, 0.05)
      // this.ay = random(-0.05, 0.05)
      this.hit = false
    }
  }
  
  edges() {
    if(this.x > width) {
      this.vx *= -1
    }
    
    if(this.x < 0) {
      this.vx *= -1
    }
    
    if(this.y > height) {
      this.vy *= -1
    }
    
    if(this.y < 0) {
      this.vy *= -1
    }
  }
}

class circleObj {
  constructor(dia) {
    this.dia = dia
    
    this.clr = color(random(255), random(255), random(255))
  }
  
  display(x, y) {
    this.x = x;
    this.y = y;
    noStroke();
    // fill(this.clr)
    // ellipse(this.x, this.y, this.dia)
  }
}