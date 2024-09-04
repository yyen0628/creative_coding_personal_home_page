function preload() {

}

function setup() {
  createCanvas(800, 800);
  frameRate(1);
}

function draw() {
  background(220);
  
  let f = new Face();
  f.display();
}

class Face {
  //properties
  constructor() {
    //face
    this.size = random(80, 100);
    this.x = random(this.size/2, width - this.size/2);
    this.y = random(this.size/2, height - this.size/2);
    this.skinColor = color(random(255), random(255), random(255));
    
    //eye
    this.eyeLeft = this.x - 15;
    this.eyeRight = this.x + 15;
    this.eyeHeight = this.y - random(5, 8);
    this.eyeSize = random(12, 18)
    this.eyeColor = color(255, 255, 255);
    
    //mouth
    this.mouthSize = 18;
    this.mouthX = this.x - this.mouthSize/2;
    this.mouthY = this.y + 15;
  }
  
  //methods
  display() {
    fill(this.skinColor);
    ellipse(this.x, this.y, this.size);
    
    //eye display
    fill(this.eyeColor);
    ellipse(this.eyeLeft, this.eyeHeight, this.eyeSize);
    ellipse(this.eyeRight, this.eyeHeight, this.eyeSize);
    
    fill(0, 0, 0);
    ellipse(this.eyeLeft, this.eyeHeight, this.eyeSize-8);
    ellipse(this.eyeRight, this.eyeHeight, this.eyeSize-8);
    
    //mouth
    fill(255, 0, 0);
    rect(this.mouthX, this.mouthY, this.mouthSize);
  }
}