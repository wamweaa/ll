                                                                                       /*
  Johan Karlsson (DonKarlssonSan)
*/
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
    iterations = 5;
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
        var stepSize = 30;
        if(px[off+3] > 100) {
          stepSize = 2;
        }
        p.move(stepSize);
        p.draw();
      });
    }
  }
  
  function initParticles() {
    particles = [];
    for(var i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
  }
  
 function initImage() {
  background(255); // Clear the background to white
  textAlign(LEFT, TOP); // Align text to top-left for better layout

  let message = "Hey Rachel,\n\nYou’re truly one of the most amazing people I know — everything you do carries a spark of brilliance and heart. I care deeply about you and all the things you set your mind to. I’m cheering for you always and wishing you nothing but the very best in every little and big adventure ahead. ❤️✨\n\nAnd remember, as Captain Jack Sparrow would say:\n\n\"The problem is not the problem. The problem is your attitude about the problem.\"\n\nSo keep that pirate spirit, and sail boldly — you’ve got this. 🏴‍☠️💫";

  let padding = 40;
  let maxTextWidth = w - padding * 2;
  let fontSize = min(24, w / 50); // Responsive font size
  textSize(fontSize);
  textLeading(fontSize * 1.5); // Good line spacing
  fill(0); // Text color

  text(message, padding, padding, maxTextWidth); // Draw text wrapped within canvas

  // Capture the current text image for animation logic
  let image = get(0, 0, w, h);
  image.loadPixels();
  px = image.pixels;

  // Optionally, re-clear background if you want only particles visible
  // background(255); // Comment out if you want text to remain visible
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
  
