let serial;
let portName = "/dev/tty.usbmodem14401"; // Change for your system (Check in p5.serialcontrol)
let clicks = []; // Stores click positions
let votes = [0, 0, 0, 0]; // Voting for 4 quadrants
let votingActive = true;
let startTime;
let voteDuration = 20 * 60 * 1000; // 10 minutes
let ledDuration = 20 * 60 * 1000; // 1 minute LED duration
let mostVoted = -1;
let ledOn = false;
let ledStartTime = 0;
let slimeWalkers = [];
let corners = [];
let fadingEllipses = [];
let cloneThresholds = [0, 0, 0, 0]; // 每個角落的 clone 門檻

//UV glow in the corners
//Changing of the light, strength

class slimeWalker {
  constructor(x, y, targetX, targetY) {
    this.firstPos = createVector(x, y);
    this.curPos = this.firstPos; // 中心點
    this.target = createVector(targetX, targetY);
    this.prePos = this.curPos;
    //this.vel = createVector(random(-1, 1), random(-1, 1))
    this.randomness = 1.5;
    this.speed = 0.5; // 控制移動速度
    this.c = color(160, 124, 30);
    this.moving = false;
  }

  move() {
    //if (mostVoted === -1) return; // 沒有投票結果則不移動
    if (!this.moving) return;

    //let target = corners[mostVoted]; // 取得目標角落

    let direction = p5.Vector.sub(this.target, this.curPos); // 計算方向
    direction.setMag(this.speed); // 設置固定速度

    let randomDir = p5.Vector.random2D();
    randomDir.mult(this.randomness);

    let moveDir = p5.Vector.add(direction, randomDir);

    this.curPos.add(moveDir); // 移動避免者
    this.moving = false;
  }

  update() {
    let d1 = dist(this.curPos.x, this.curPos.y, 0, 0);
    let d2 = dist(this.curPos.x, this.curPos.y, width, 0);
    let d3 = dist(this.curPos.x, this.curPos.y, 0, height);
    let d4 = dist(this.curPos.x, this.curPos.y, width, height);
    let dc = dist(width / 2, height / 2, 0, 0);

    let r = map(d1, dc, 0, 150, 255);
    let g = map(d2, dc, 0, 124, 255);
    let b = map(d3, dc, 0, 30, 255);
    //let b =

    if (mostVoted == 0) {
      this.c = color(r, 124, 30);
      console.log(r);
    } else if (mostVoted == 1) {
      this.c = color(160, g, 30);
    } else if (mostVoted == 2) {
      this.c = color(150, 124, b);
    } else if (mostVoted == 3) {
      this.c = color(r, g, b);
    }
  }

  show() {
    fill(this.c);
    //noStroke();
    strokeWeight(0.5);
    stroke(this.c);
    ellipse(this.curPos.x, this.curPos.y, 1);
    line(this.curPos.x, this.curPos.y, this.prePos.x, this.prePos.y);
  }
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  //background(255);
  serial = new p5.SerialPort();
  serial.open(portName);

  corners = [
    createVector(0, 0), // 左上角
    createVector(width, 0), // 右上角
    createVector(0, height), // 左下角
    createVector(width, height), // 右下角
  ];

  for (let i = 0; i < 4; i++) {
    slimeWalkers.push(
      new slimeWalker(width / 2, height / 2, corners[i].x, corners[i].y)
    );
  }
  startTime = millis();
}

function draw() {
  // Draw all recorded clicks
  for (let click of clicks) {
    //noFill();
    noStroke();
    ellipse(click.x, click.y, 2);
  }
  
  // Draw fading glow ellipses
  for (let i = fadingEllipses.length - 1; i >= 0; i--) {
    let e = fadingEllipses[i];
    let age = millis() - e.startTime;
    let fillValue = map(age, 0, 500, 0, 255); // fade over 1 sec
    let alpha = map(age, 0, 1000, 255, 0);

    if (alpha <= 0) {
      fadingEllipses.splice(i, 1); // remove once faded
      erase();
      ellipse(e.x, e.y, 6);
      noErase();
    } else {
      noStroke();
      fill(fillValue, alpha);

      //console.log(alpha)
      //console.log(e.color)
      ellipse(e.x, e.y, 10); // glowing dot size
    }
  }

  // Show avoiding walker
  // 讓 AvoidingWalker 朝向 mostVoted 移動
  // avoidingWalker.findMostVoted();
  // avoidingWalker.update();
  // avoidingWalker.show();

  for (let i = 0; i < slimeWalkers.length; i++) {
    let sw = slimeWalkers[i];
    let targetIndex = corners.findIndex((corner) => corner.equals(sw.target));

    if (mostVoted === -1 || mostVoted === i) {
      sw.move();
      sw.update();
      sw.show();
      //sw.moving = true
      //console.log(slimeWalkers.length);

      if (votes[i] >= cloneThresholds[i] + 20) {
        // 在 votes 到達新的 20 倍數時才觸發
        let existingWalker = slimeWalkers[i];
        slimeWalkers.push(
          new slimeWalker(
            // existingWalker.curPos.x,
            // existingWalker.curPos.y,
            width/2, height/2,
            corners[i].x,
            corners[i].y
          )
        );
        cloneThresholds[i] += 20;
      }
    }
  }

  if (millis() - startTime > voteDuration) {
    endVoting();
  }

  // Turn off LED after 1 minute
  if (ledOn && millis() - ledStartTime > ledDuration) {
    ledOn = false;
    mostVoted = -1; // Reset mostVoted after LED turns off
  }
}

function mousePressed() {
  if (!votingActive) return;

  let color;
  let index = -1;

  // Determine the quadrant where the mouse is clicked
  if (mouseX < width / 2 && mouseY < height / 2) {
    index = 0;

    //color = "red"; // Top-left
  } else if (mouseX > width / 2 && mouseY < height / 2) {
    index = 1;
    //color = "blue"; // Top-right
  } else if (mouseX < width / 2 && mouseY > height / 2) {
    index = 2;
    //color = "green"; // Bottom-left
  } else if (mouseX > width / 2 && mouseY > height / 2) {
    index = 3;
    //color = "purple"; // Bottom-right
  }

  for (let sw of slimeWalkers) {
    let targetIndex = corners.findIndex((corner) => corner.equals(sw.target));
    if (targetIndex === index) {
      sw.moving = true;
    }
  }

  if (index !== -1) {
    votes[index]++; // Increase vote count
    // Create a fading ellipse at the click location
    fadingEllipses.push({
      x: mouseX,
      y: mouseY,
      startTime: millis(),
      //color: color(10, 100, 0), // Customize glow color if you like
    });
    // Store click position
  }

  //avoidingWalker.move(); // Move avoiding walker
}

function endVoting() {
  votingActive = false;
  //background(200, 0, 200)
  let cnv = document.getElementById("defaultCanvas0")
  cnv.style.backgroundColor = "rgb(150, 20, 255)"

  // Check if all votes are the same
  const allEqual = votes.every((val) => val === votes[0]);

  if (allEqual) {
    mostVoted = -1;
  } else {
    mostVoted = votes.indexOf(Math.max(...votes));
  }

  sendToArduino(mostVoted);

  if (mostVoted !== -1) {
    ledOn = true;
    ledStartTime = millis();
  }

  setTimeout(resetVoting, ledDuration);
  console.log(votes);
  console.log("Vote ended!");
}

function resetVoting() {
  let cnv = document.getElementById("defaultCanvas0")
  cnv.style.backgroundColor = "white"
  votes = [0, 0, 0, 0]; // Reset votes
  votingActive = true;
  startTime = millis(); // Restart timer
  mostVoted = -1;
  sendToArduino(mostVoted);
  console.log("Vote start!");
}

function sendToArduino(index) {
  if (serial) {
    let ledStates = [1, 1, 1, 1]; // 所有燈預設開啟
    if (index !== -1) {
      ledStates[index] = 0; // 關閉得票最多的燈
    }
    let message = ledStates.join('') + "\n"; // 例如 "0111"
    serial.write(message);
    console.log("Sending to Arduino:", message);
  }
}
