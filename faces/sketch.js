let eye;
let f = [];
let fr;

function preload() {
  eye = loadImage("eyeball.png");
}

function setup() {
  createCanvas(800, 800);
  
  //frameRate(10);
  pixelDensity(2);
  f = new Face();
}

function draw() {
  background(220);
  f.display();

  if(mouseIsPressed) {
    f.move();
  }
}

// function mouseDragged() {
//   f.move();
// }

class Face {
  //properties
  constructor() {
    //face
    this.size = random(80, 100);
    this.x = random(this.size/2, width - this.size/2);
    this.y = random(this.size/2, height - this.size/2);
    this.skinColor = color(random(255), random(255), random(255));
    this.speed = 5;
    
    //eye
    this.eyeLeft = this.x - 20;
    this.eyeRight = this.x + 20;
    this.eyeHeightDistance = random(5, 8)
    this.eyeHeight = this.y - this.eyeHeightDistance;
    this.eyeSize = random(20, 24);
    this.pupilSize = this.eyeSize - random(10, 12);
    this.eyeColor = color(255, 255, 255);
    
    //mouth
    this.mouthSizeX = random(25, 30);
    this.mouthSizeY = random(15, 20);
    this.mouthX = this.x - this.mouthSizeX/2;
    this.mouthY = this.y + 15;
  }
  
  //methods
  display() {
    fill(this.skinColor);
    //noStroke();
    rotate(this.angle);
    ellipse(this.x, this.y, this.size);
    
    //eye display
    fill(this.eyeColor);
    ellipse(this.eyeLeft, this.eyeHeight, this.eyeSize);
    ellipse(this.eyeRight, this.eyeHeight, this.eyeSize);
    
    fill(0, 0, 0);
    ellipse(this.eyeLeft, this.eyeHeight, this.pupilSize);
    ellipse(this.eyeRight, this.eyeHeight, this.pupilSize);
    
    //mouth
    fill(255, 0, 0);
    rect(this.mouthX, this.mouthY, this.mouthSizeX, this.mouthSizeY);
  }

  move() {
    this.x += random(this.speed);
    this.y += random(this.speed);
    this.skinColor = color(random(255), random(255), random(255));

    this.eyeLeft = this.x - 20;
    this.eyeRight = this.x + 20;
    this.eyeHeight = this.y - this.eyeHeightDistance;
    this.mouthX = this.x - this.mouthSizeX/2;
    this.mouthY = this.y + 15;

    if(this.x > width) {
      this.x = random(this.size/2, width - this.size/2);
      // speed *= -1;
      this.x += random(this.speed);
    }else if(this.y > height) {
      this.y = random(this.size/2, height - this.size/2);
    }

    fill(this.skinColor);
    ellipse(this.x, this.y, this.size);
    
    //eye display
    fill(this.eyeColor);
    ellipse(this.eyeLeft, this.eyeHeight, this.eyeSize);
    ellipse(this.eyeRight, this.eyeHeight, this.eyeSize);
    
    fill(0, 0, 0);
    ellipse(this.eyeLeft, this.eyeHeight, this.pupilSize);
    ellipse(this.eyeRight, this.eyeHeight, this.pupilSize);
    
    //mouth
    fill(255, 0, 0);
    rect(this.mouthX, this.mouthY, this.mouthSizeX, this.mouthSizeY);
  }
}