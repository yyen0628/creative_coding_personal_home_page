let morseCodeMap = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  " ": " ",
  ".": "+",
};

let message = " ";
let morseMessage;
let index = 0;
let isDash = false;
let timeElapsed = 0;
let input;
let x, y, x2, y2;
let inputTexts = [];
let morseCharacters = [];
let currentTime = 0;
let dotSound, dashSound;
let printMillis = true;
let currentSequenceMaxTime;

function preload() {
  dashSound = loadSound("long-morse-code-made-with-Voicemod.mp3");
  dotSound = loadSound("short-morse-code-two-made-with-Voicemod.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);

  //frameRate(10)
}

function draw() {
  background(0, 20);
  // loop through morseCharacters
  // use millis() to fade in chars based on fadeTime for each char.

  if (morseCharacters.length > 0) {
    currentSequenceMaxTime =
      morseCharacters[morseCharacters.length - 1].fadeTime;
  }

  if (millis() >= currentSequenceMaxTime) {
    for (let i = 0; i < morseCharacters.length; i++) {
      let m = morseCharacters[i];
      
      // update the fadeTime of each character.
  }
  }

  for (let i = 0; i < morseCharacters.length; i++) {
    let m = morseCharacters[i];

    m.show();
  }

  for (let i = 0; i < inputTexts.length; i++) {
    let cit = inputTexts[i];
    cit.update();
    cit.show();
  }
}

function windowResized() {
  background(0);
  resizeCanvas(windowWidth, windowHeight);
}

function moveToNext() {
  timeElapsed = 0;
  index++;
  if (index >= morseMessage.length) {
    index = 0; // Loop the message
  }
}

// ask chatGPT to .join("+") if there is a . for a new sentence
function textToMorse(text) {
  return text
    .toLowerCase()
    .split("")
    .map((c) => morseCodeMap[c] || "")
    .join(" ");
}

const DOT_TIME = 100;
const DASH_TIME = 100;
const LETTER_TIME = 200;
const SENTENCE_TIME = 1000;

let timeTracker = 0;

function keyPressed() {
  if (keyCode === ENTER) {
    printMillis = false;

    morseCharacters = [];
    currentTime = millis();
    //console.log("currentTime: " + currentTime)
    input = document.getElementById("userInput");
    message = input.value;
    morseMessage = textToMorse(message);

    inputTexts.push(new Text(message));

    //let morsePhrase = morseMessage;

    // "***- * ---+"

    for (let i = 0; i < morseMessage.length; i++) {
      let currentChar = morseMessage[i];
      //console.log(currentChar)

      if (currentChar === ".") {
        morseCharacters.push(new Character(".", currentTime + timeTracker));
        timeTracker += DOT_TIME;
      } else if (currentChar === "-") {
        morseCharacters.push(new Character("-", currentTime + timeTracker));
        timeTracker += DASH_TIME;
      } else if (currentChar === " ") {
        morseCharacters.push(new Character(" ", currentTime + timeTracker));
        timeTracker += LETTER_TIME;
      } else if (currentChar === "+") {
        morseCharacters.push(new Character(" ", currentTime + timeTracker));
        timeTracker += SENTENCE_TIME;
      }
    }
    timeTracker = 0;
  }

  // if(key == ' ') {
  //   dashSound.play()
  // }

  // morseCharacters.forEach(c => {
  //   console.log(c.fadeTime)
  // })
}

class Character {
  constructor(char, fadeTime) {
    this.char = char;
    this.x = random(width);
    this.y = random(height);
    this.opacity = 0;
    this.fadeInTime = fadeTime;
    this.duration = 2000;
    this.rectWidth = random(100, 120);
    this.angle = random(PI);
    this.fadeAway = false;
    this.dashSoundPlayed = false;
    this.dotSoundPlayed = false;
    this.triggered = false;
  }

  show() {
    // if the character has not completed its duration, increase the opacity
    // else, decrease the opacity
    //this.appearTime = millis() - this.fadeInTime + 255
    if (
      this.opacity < millis() - this.fadeInTime + 255 &&
      this.fadeAway == false
    ) {
      this.opacity = millis() - this.fadeInTime;
      if (this.opacity > 0 && this.opacity < 255) {
        this.triggered = true;
      }
      // console.log(this.opacity, this.soundPlayed)
    }

    if (this.opacity - 255 > this.duration) {
      this.opacity = this.fadeInTime + 255 + this.duration - millis();
      this.fadeAway = true;
    }

    // currentTime: 2615
    // time when dot fades In = 2615 + 250 = 2865 (opacity is 0)
    // after 255 more millis() (3120, opacity goes to 255

    if (this.char == ".") {
      //this.dotSoundPlayed = false
      if (this.dotSoundPlayed == false && this.triggered == true) {
        dotSound.play();
        this.dotSoundPlayed = true;
        this.triggered = false;
      }

      this.dot(this.opacity);
    } else if (this.char == "-") {
      //this.dashSoundPlayed = false;
      if (this.dashSoundPlayed == false && this.triggered == true) {
        dashSound.play();
        this.dashSoundPlayed = true;
        this.triggered = false;
      }
      this.dash(this.opacity);
    } else if (this.char == " ") {
      this.space();
    }

    //console.log(this.dotSound)
  }

  dot(_opacity) {
    noStroke();
    fill(200, _opacity);
    ellipse(this.x, this.y, 20);
  }

  dash(_opacity) {
    rectMode(CENTER);
    noStroke();
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(200, _opacity);
    rect(0, 0, this.rectWidth, 20);
    pop();
  }

  space() {
    // show nothing
  }
}

class Text {
  constructor(inputText) {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-3, 3), random(-3, 3));
    this.inputText = inputText;
    this.clr = color(random(100, 200), random(100, 200), random(100, 200));
    this.scl = random(20, 40);
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
    //this.scl = random(30, 40)
  }

  show() {
    stroke(this.clr);
    strokeWeight(1);
    fill(this.clr);
    textSize(this.scl);
    text(this.inputText, this.pos.x, this.pos.y);
  }

  edges() {
    if (this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.x < 0) {
      this.vel.x *= -1;
    }

    if (this.pos.y > height) {
      this.vel.y *= -1;
    }

    if (this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }
}
