# Cow Animation-User Input
# Creative coding major project
# ruli0028_9103_tut09

## 1.  Introduction
This project is my personal reinterpretation of our group-coded ASCII cow visualization using **user input (mouse & keyboard)** as the core animation drivers. It is built with p5.js and takes inspiration from the abstract artwork "Untitled (Bull)" by Elaine de Kooning, which I selected at the beginning of the assignment.  
Move your mouse to control background ripple and cow-leg swing; press **Space** to toggle the high-contrast animation mode and experience an interactive, rhythm-driven artwork.

 **How to start and interact**  
- Open the page where 'index.html' is located
- on the screen **Move the mouse**：  
  - Move the mouse horizontally ⇒ Control the intensity of background jitter
  - Move the mouse vertically ⇒ Control the swing amplitude of the bull leg 
- Press any key (Space/Enter) ⇒ Switch to the enhanced animation mode

## 2. Personal animation plan
- **Drive mode**：User Input（Mouse + keyboard）  
- **The difference from within the group**：  
  - My version is based on "interactive triggering", and the animation parameters are adjusted in real time through the mouse position；  
  - Other students respectively used audio, Perlin noise, timers and other methods, but the effects were different。

## 3. Animation attributes and differentiation
| Animation attributes                | （User Input）                           | Others' examples               |
|:-----------------------|:-----------------------------------------------|:----------------------|
| Background jitter intensity            | Linearly map according to the position of the mouse's X-axis                   | Perlin noise is randomly driven    |
| The swing amplitude of the ox leg            | Linearly map according to the position of the mouse's Y-axis                   | The timer swings periodically        |
| Press the button to switch to the "High contrast" mode    | The swing/jitter coefficient is increased after the key is clicked                       | The audio amplitude drives the Angle change    |

## 4. Inspiration and Reference
- **Design inspiration**  
  - Common mouse linkage in interactive data visualization  
  - Official example of p5.js: "Interactive Particles"
**Artwork Reference**  

My visual choices were heavily influenced by the artwork:

**Elaine de Kooning - _Untitled (Bull)_**  
![Reference artwork: Untitled (Bull) by Elaine de Kooning](https://uploads6.wikiart.org/images/elaine-de-kooning/untitled-bull-1973.jpg)

![Style Reference](https://npr.brightspotcdn.com/16/1d/5534dfbe42879cf38006ceeac92a/2005-36-01-ri-01b.jpeg)

The bold gestures, abstract line contours, and raw texture in de Kooning’s work inspired the rough polygonal rendering of the cow and the expressive ASCII + brushstroke visual style.

## 5. Technical Description

// "keyIsPressed" is a global variable in p5.js, which increases the animation amplitude when pressed

let keyFactor = keyIsPressed ? 1.5 : 1.0;

// Map the mouse X/Y to the jitter and swing amplitude

let mxFactor = map(mouseX, 0, width, 0.5, 2);
let myFactor = map(mouseY, 0, height, 0.5, 2);

## 6. External Tools & Techniques

- **Off-screen Buffers with `createGraphics()`**  
  I used three separate p5.Graphics layers (`bg`, `rippleBg`, `textureOverlay`) to decouple my oil-stroke background, pixel-distortion buffer, and grain overlay. 

- **Custom Per-Pixel Ripple Shader**  
  Instead of relying on p5’s built-in filters, I wrote my own ripple algorithm by calling `loadPixels()`/`updatePixels()` and indexing the pixel array directly. I displace each sample by an amount proportional to its red-channel brightness and a sine-driven angle. This low-level pixel work was inspired by GLSL ripple tutorials.

- **Hand-drawn “Impasto” Brush Strokes via Perlin Noise**  
  Building on Weeks 6 and 11 where we played with `noise()`, I used Perlin-noise sampling to choose both stroke color and orientation for 80 000 short lines, simulating a tactile, oil-paint impasto effect. The stroke directions come from a second noise field (`noise(x*0.0015, y*0.0015, 10)`), giving a natural, painterly randomness rather than the uniform shapes we saw in class.

- **Rough Polygon Jitter**: Subdivide each edge at fixed spacing, then offset points randomly perpendicular to the edge by a small random "jitter", mimicking the look of Rough.js (see https://github.com/pshihn/rough) in pure p5.js.

- **Interactive Control Mapping**  
  I mapped `mouseX` and `mouseY` through `map()` to smoothly vary both distortion amplitude (`0.5×…2×`) and swing strength. Plus a `keyIsPressed` boost factor (×1.5) for extra interactivity.

- **Blend Modes & Grain Overlay**  
  Drawing 100 000 semi-transparent dots on `textureOverlay` and compositing it with `blendMode(OVERLAY)` creates a unified “canvas grain” over the scene.

- **Dynamic Canvas Scaling**  
  Although Week 9 covered `windowResized()` and `resizeCanvas()`, I added a responsive CSS transform (`canvas.style.transform`) so the sketch uniformly scales within the browser window while preserving its 840 × 620 aspect ratio.

- **References & Inspirations**  
  - **The Nature of Code**: noise-driven line examples influenced my impasto strokes.  
  - **p5.js Ripple Forum Thread**: guided pixel-array displacement logic.  
  - **Rough.js Tutorial**: conceptual reference for hand-drawn polygon jitter.
