
const BASE_WIDTH = 840;
const BASE_HEIGHT = 620;

let bg;               
let textureOverlay;   
let rippleBg;        

let maxDispBase = 20;      
let cowAmpBase = 0.06;     

let body, leg1, leg2, leg3, leg4, horn1, horn2;

function setup() {
  createCanvas(BASE_WIDTH, BASE_HEIGHT);
  pixelDensity(1);
  updateCanvasScale();

  bg = createGraphics(width, height);
  textureOverlay = createGraphics(width, height);
  rippleBg = createGraphics(width, height);

  createImpastoBG();
  createGrainTexture(textureOverlay);

  body = [
    createVector(146,313), createVector(259,236), createVector(367,220),
    createVector(461,153), createVector(622,126), createVector(642,115),
    createVector(682,121), createVector(708,154), createVector(709,203),
    createVector(714,219), createVector(726,239), createVector(699,262),
    createVector(617,302), createVector(597,341), createVector(585,353),
    createVector(521,389), createVector(478,404), createVector(383,432),
    createVector(208,466), createVector(169,471), createVector(136,416)
  ];
  leg1 = [ createVector(580,350), createVector(642,384), createVector(672,438), createVector(634,421), createVector(638,414), createVector(515,385) ];
  leg2 = [ createVector(515,384), createVector(518,477), createVector(490,467), createVector(472,400) ];
  leg3 = [ createVector(378,428), createVector(330,434), createVector(235,514), createVector(221,546), createVector(186,553), createVector(132,593), createVector(125,580), createVector(131,542), createVector(144,530), createVector(200,497), createVector(223,452) ];
  leg4 = [ createVector(175,466), createVector(143,495), createVector(119,500), createVector(125,501), createVector(108,533), createVector(93,582), createVector(73,583), createVector(59,587), createVector(37,568), createVector(82,500), createVector(81,480), createVector(143,410) ];
  horn1 = [ createVector(668,169), createVector(685,190), createVector(729,183) ];
  horn2 = [ createVector(488,128), createVector(506,143), createVector(622,125) ];
}


function draw() {
 
  let mxFactor = map(mouseX, 0, width, 0.5, 2);         
  let myFactor = map(mouseY, 0, height, 0.5, 2);        
  let keyFactor = keyIsPressed ? 1.5 : 1.0;              


  bg.loadPixels();
  rippleBg.loadPixels();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let i = (y * width + x) * 4;
      let brightness = bg.pixels[i];
      let maxDisp = maxDispBase * mxFactor * keyFactor;
      let disp = map(brightness, 0, 255, 0, maxDisp);
      let angle = sin((x + y) * 0.02 + frameCount * 0.05) * TWO_PI;
      let sx = constrain(x + cos(angle) * disp, 0, width - 1);
      let sy = constrain(y + sin(angle) * disp, 0, height - 1);
      let si = (floor(sy) * width + floor(sx)) * 4;
      rippleBg.pixels[i]   = bg.pixels[si];
      rippleBg.pixels[i+1] = bg.pixels[si+1];
      rippleBg.pixels[i+2] = bg.pixels[si+2];
      rippleBg.pixels[i+3] = bg.pixels[si+3];
    }
  }
  rippleBg.updatePixels();

  image(rippleBg, 0, 0);

  let swingAngle = sin(frameCount * 0.05) * (cowAmpBase * myFactor * keyFactor);

  drawCow(swingAngle);
  push(); blendMode(OVERLAY); image(textureOverlay, 0, 0); blendMode(BLEND); pop();
}

function createGrainTexture(g) {
  const amount = 100000;
  g.noStroke();
  for (let i = 0; i < amount; i++) {
    let x = random(width), y = random(height);
    let a = random(0, 15);
    g.fill(random()>0.5?255:0, a);
    g.rect(x, y, 1, 1);
  }
}

function drawCow(swingAngle) {
  const pivots = [ createVector(610,370), createVector(500,395), createVector(350,440), createVector(160,420) ];
  drawRoughPolygon(body, 1, '#1a1a1a', 14);
  [leg1,leg2,leg3,leg4].forEach((leg,i)=>{
    let p = pivots[i];
    push();
      translate(p.x, p.y);
      rotate(i % 2 ? -swingAngle : swingAngle);
      translate(-p.x, -p.y);
      drawRoughPolygon(leg, 1, '#1a1a1a', 14);
    pop();
  });
  drawRoughPolygon(horn1, 0, '#FFF', 10);
  drawRoughPolygon(horn2, 0, '#F5F5F5', 10);
}

function drawRoughPolygon(vs, jit=8, fc='#dbb277', sd=14) {
  if (!vs || vs.length === 0) return;
  let pts = [];
  for (let i = 0; i < vs.length; i++) {
    let p1 = vs[i], p2 = vs[(i+1) % vs.length];
    let steps = int(dist(p1.x, p1.y, p2.x, p2.y) / sd);
    for (let t = 0; t < steps; t++) {
      let x = lerp(p1.x, p2.x, t/steps), y = lerp(p1.y, p2.y, t/steps);
      let a = atan2(p2.y-p1.y, p2.x-p1.x) + HALF_PI;
      let d = random(-jit, jit);
      pts.push(createVector(x + cos(a)*d, y + sin(a)*d));
    }
  }
  noStroke(); fill(fc);
  beginShape(); pts.forEach(p=>vertex(p.x, p.y)); endShape(CLOSE);
}

const noiseScale = 0.003;
const colours = ["#fccace","#bcbdf5","#f5ce20","#f56020","#003366","#6699cc"];
function createImpastoBG() {
  bg.noFill(); let strokes=80000, len=12;
  for(let i=0;i<strokes;i++){
    let x=random(width), y=random(height);
    let n=noise(x*noiseScale, y*noiseScale);
    let c=colours[int(n*colours.length)%colours.length];
    bg.stroke(c); bg.strokeWeight(random(1,2.5));
    let an=noise(x*noiseScale*0.5, y*noiseScale*0.5, 10);
    let a=map(an,0,1,0,TWO_PI*2);
    bg.line(x, y, x + cos(a)*len, y + sin(a)*len);
  }
}

function updateCanvasScale(){
  let f=min(windowWidth/BASE_WIDTH, windowHeight/BASE_HEIGHT)*0.95;
  let c=document.querySelector('canvas');
  c.style.transform=`scale(${f})`;
  c.style.position='absolute';
  c.style.left=`calc(50% - ${BASE_WIDTH*f/2}px)`;
  c.style.top=`calc(50% - ${BASE_HEIGHT*f/2}px)`;
}

function windowResized(){ updateCanvasScale(); }
