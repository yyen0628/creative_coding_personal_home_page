let particleSystem;
let boxSize = 300;  // Size of the cube boundary

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);  // 3D canvas with WEBGL
  particleSystem = new ParticleSystem(createVector(0, 0, 0), boxSize);
}

function draw() {
  background(0);
  orbitControl(); // Allows you to rotate the view with the mouse
  
  // Add new particles continuously
  particleSystem.addParticle();
  
  // Display and update the cube boundary and particles
  particleSystem.run();
  
  // Draw the cube that the particles are bouncing inside
  noFill();
  stroke(255);
  strokeWeight(2);
  box(boxSize * 2);  // The visual boundary of the cube (double the boxSize)
}

// Particle class
class Particle {
  constructor(position, boxSize) {
    this.position = position.copy();
    this.velocity = createVector(random(-2, 2), random(-2, 2), random(-2, 2));  // Random 3D velocity
    this.acceleration = createVector(0, 0, 0);
    this.lifespan = 255;  // Lifespan of each particle (optional)
    this.radius = 10;  // Radius of the particle (sphere size)
    this.boxSize = boxSize;  // The cube boundary
  }

  // Update the particle's movement and check for bouncing
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);  // Reset acceleration after each update

    // Handle bouncing within the cube boundaries
    this.checkEdges();
  }

  // Display the particle as a sphere
  display() {
    noStroke();
    fill(255, this.lifespan);
    push();
    translate(this.position.x, this.position.y, this.position.z);
    sphere(this.radius);
    pop();
  }

  // Check if the particle hits any boundary of the cube and bounce
  checkEdges() {
    let halfBox = this.boxSize / 2;

    // Check the X boundaries
    if (this.position.x + this.radius > halfBox || this.position.x - this.radius < -halfBox) {
      this.velocity.x *= -1;  // Reverse direction in the X axis
    }

    // Check the Y boundaries
    if (this.position.y + this.radius > halfBox || this.position.y - this.radius < -halfBox) {
      this.velocity.y *= -1;  // Reverse direction in the Y axis
    }

    // Check the Z boundaries
    if (this.position.z + this.radius > halfBox || this.position.z - this.radius < -halfBox) {
      this.velocity.z *= -1;  // Reverse direction in the Z axis
    }
  }

  // Optionally, reduce the lifespan for fading effects
  isDead() {
    this.lifespan -= 2;
    return this.lifespan < 0;
  }
}

// Particle System class to manage multiple particles
class ParticleSystem {
  constructor(position, boxSize) {
    this.origin = position.copy();
    this.particles = [];
    this.boxSize = boxSize;
  }

  // Add a new particle to the system
  addParticle() {
    this.particles.push(new Particle(this.origin, this.boxSize));
  }

  // Update and display all particles
  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.display();
      
      // Remove dead particles
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}
