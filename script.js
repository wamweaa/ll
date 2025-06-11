function Particle() {
  this.x = random([0, w]);
  this.y = random([0, h]);
  this.oldX = this.x;
  this.oldY = this.y;
}

Particle.prototype.move = function(stepSize) {
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += random(-stepSize, stepSize);
  this.y += random(-stepSize, stepSize);
  if(this.x < 0) this.x = 0;
  if(this.x > w) this.x = w;
  if(this.y < 0) this.y = 0;
  if(this.y > h) this.y = h;
}

Particle.prototype.draw = function() {
  line(this.oldX, this.oldY, this.x, this.y);
}

var particles;
var iterations;
var px;
var w;
var h;

function setup() {
  cursor(HAND);
  iterations = 10; // Increased from 5 to 10 for more updates per frame
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  reset();
  stroke(0, 10);
}

function draw() {
  for(var i = 0; i < iterations; i++) {
    particles.forEach(p => {
      var x = floor(p.x);
      var y = floor(p.y);
      var off = (y * w + x) * 4; 
      var stepSize = 50; // Increased from 30 to 50 for faster movement in blank areas
      if(px[off+3] > 100) {
        stepSize = 5; // Increased from 2 to 5 for faster movement in text areas
      }
      p.move(stepSize);
      p.draw();
    });
  }
}

function initParticles() {
  particles = [];
  for(var i = 0; i < 200; i++) { // Increased from 50 to 200 for more particles
    particles.push(new Particle());
  }
}

function initImage() {
  var message = "Hey Rachel,You're amazing";
  var tSize = 100;
  textSize(tSize);
  var tWidth = textWidth(message);
  text(message, w / 2 - tWidth / 2, h / 2 + tSize / 2);
  var image = get(0, 0, w, h);
  image.loadPixels();
  px = image.pixels;
  background(255);
}

function reset() {
  initParticles();
  clear();
  initImage();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  reset();
}

function mouseClicked() {
  reset();
}
