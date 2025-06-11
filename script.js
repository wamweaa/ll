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
    textAlign(LEFT, TOP); 
    let padding = 40;
    var message = "Hey Rachel,You’re truly one of the most amazing people I know — everything you do carries a spark of brilliance and heart. I care deeply about you and all the things you set your mind to. I’m cheering for you always and wishing you nothing but the very best in every little and big adventure ahead. ❤️✨And remember, as Captain Jack Sparrow would say:The problem is not the problem. The problem is your attitude about the problem.So keep that pirate spirit, and sail boldly — you’ve got this. 🏴‍☠️💫";
    var tSize = 150;
    textSize(tSize);
    var tWidth = textWidth(message);
    
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
  
