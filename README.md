# Cow Animation-User Input
# Creative coding major project
# ruli0028_9103_tut09

## Introduction
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
| Animation attributes                | （User Input）                           | 他人示例               |
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
![Reference artwork: Untitled (Bull) by Elaine de Kooning](assets/untitled_bull_elaine.jpeg)

![Style Reference](assets/reference_style_abstract.jpeg)

The bold gestures, abstract line contours, and raw texture in de Kooning’s work inspired the rough polygonal rendering of the cow and the expressive ASCII + brushstroke visual style.
## 5. Technical Description
```js
// "keyIsPressed" is a global variable in p5.js, which increases the animation amplitude when pressed
let keyFactor = keyIsPressed ? 1.5 : 1.0;

// Map the mouse X/Y to the jitter and swing amplitude
let mxFactor = map(mouseX, 0, width, 0.5, 2);
let myFactor = map(mouseY, 0, height, 0.5, 2);

## 5. Technical Description
## External Tools & Techniques

- **Off-screen Buffers with `createGraphics()`**  
  I used three separate p5.Graphics layers (`bg`, `rippleBg`, `textureOverlay`) to decouple my oil-stroke background, pixel-distortion buffer, and grain overlay. This multi-layer approach goes beyond the single-canvas demos we saw in Weeks 5–7 and lets me composite and manipulate each effect independently.

- **Custom Per-Pixel Ripple Shader**  
  Instead of relying on p5’s built-in filters, I wrote my own ripple algorithm by calling `loadPixels()`/`updatePixels()` and indexing the pixel array directly. I displace each sample by an amount proportional to its red-channel brightness and a sine-driven angle. This low-level pixel work was inspired by GLSL ripple tutorials (e.g. a p5.js forum thread https://discourse.processing.org/t/ripple-effect-tutorial) but fully reimplemented in JavaScript.

- **Hand-drawn “Impasto” Brush Strokes via Perlin Noise**  
  Building on Weeks 6 and 11 where we played with `noise()`, I used Perlin-noise sampling to choose both stroke color and orientation for 80 000 short lines, simulating a tactile, oil-paint impasto effect. The stroke directions come from a second noise field (`noise(x*0.0015, y*0.0015, 10)`), giving a natural, painterly randomness rather than the uniform shapes we saw in class.

- **Rough Polygon Jitter**  
  For the cow’s silhouette I wrote a `drawRoughPolygon()` helper that subdivides each edge at a fixed spacing, then offsets points perpendicular to the edge by a small random “jitter.” This hand-built jittering mimics the look of Rough.js https://github.com/rough-stuff/roughjs but is coded from scratch in p5.js.

- **Interactive Control Mapping**  
  I mapped `mouseX` and `mouseY` (Weeks 3–4 and 6 introduced mapping functions) through `map()` to smoothly vary both distortion amplitude (`0.5×…2×`) and swing strength. Plus a `keyIsPressed` boost factor (×1.5) for extra interactivity—an approach combining Weeks 5 event listeners with animation drivers from Week 10.

- **Blend Modes & Grain Overlay**  
  Drawing 100 000 semi-transparent dots on `textureOverlay` and compositing it with `blendMode(OVERLAY)` creates a unified “canvas grain” over the scene—a layer-blend technique beyond the normal shape fills of Weeks 1–8.

- **Dynamic Canvas Scaling**  
  Although Week 9 covered `windowResized()` and `resizeCanvas()`, I added a responsive CSS transform (`canvas.style.transform`) so the sketch uniformly scales within the browser window while preserving its 840 × 620 aspect ratio.

- **References & Inspirations**  
  - **The Nature of Code**: noise-driven line examples influenced my impasto strokes.  
  - **p5.js Ripple Forum Thread**: guided pixel-array displacement logic (rewritten end-to-end).  
  - **Rough.js Tutorial**: conceptual reference for hand-drawn polygon jitter (fully custom implementation).

These extra techniques let me push past the core p5.js labs—layering graphics, per-pixel math, and bespoke jitter algorithms—to create a richly textured, interactive “oil-painting cow” that’s far more than a simple moving rectangle or circle.

# Cow Animation-User Input
# Creative coding major project
# ruli0028_9103_tut09

---

## 1. Introduction

This project is my personal reinterpretation of our group-coded ASCII cow visualization using **user input (mouse & keyboard)** as the core animation drivers. Built with p5.js, it takes inspiration from Elaine de Kooning’s abstract artwork *Untitled (Bull)*.

Mouse movements control background ripple and cow-leg swing. Press **Space** (or any key) to toggle high-contrast animation mode and experience an interactive, rhythm-driven artwork.

## 2. How to Start and Interact

1. Open the folder containing `index.html` in your browser or serve it via a local server.
2. **Move the mouse**:

   * Horizontal ⇒ Adjust background jitter intensity.
   * Vertical ⇒ Adjust swing amplitude of the cow’s leg.
3. **Press Space/Enter**: Toggle “High-Contrast” mode for amplified swing and jitter.

## 3. Personal Animation Plan

* **Drive mode**: Real-time mapping of mouse & keyboard input
* **Group vs. Personal**:

  * My version uses interactive triggering—parameters update continuously based on mouse position.
  * Other students used audio-driven, noise-driven, or timer-based animations with different effects.

## 4. Animation Attributes & Differentiation

| Attribute                   | User Input (Mine)                  | Other Examples          |
| --------------------------- | ---------------------------------- | ----------------------- |
| Background jitter intensity | Linear mapping from mouse X-axis   | Perlin noise–driven     |
| Cow-leg swing amplitude     | Linear mapping from mouse Y-axis   | Timer-based oscillation |
| Toggle High-Contrast mode   | After key press, coefficients ×1.5 | Audio amplitude–driven  |

## 5. Inspiration & Reference

### Design Inspiration

* Interactive mouse linkage patterns in data visualization.
* Official p5.js example: “Interactive Particles.”

### Artwork Reference

**Elaine de Kooning – *Untitled (Bull)***
*Bolding gestures, abstract line contours, and raw texture influenced the rough polygonal cow silhouette and expressive ASCII + brushstroke style.*

![Untitled (Bull)](assets/untitled_bull_elaine.jpeg)

![Abstract Style Reference](assets/reference_style_abstract.jpeg)

---

## 6. Technical Description

```js
// Adjust animation based on input
let keyFactor = keyIsPressed ? 1.5 : 1.0;
let mxFactor  = map(mouseX, 0, width, 0.5, 2);
let myFactor  = map(mouseY, 0, height, 0.5, 2);
```

This snippet shows how `mouseX`, `mouseY`, and `keyIsPressed` feed into amplitude coefficients for both jitter and swing.

### Core Techniques

* **Custom Ripple Algorithm**: Low-level per-pixel displacement using `loadPixels()`/`updatePixels()` based on red-channel brightness and sine functions.
* **Impasto Brush Strokes**: 80,000 hand-drawn lines with Perlin noise–driven orientation and color to simulate oil-paint texture.
* **Rough Polygon Jitter**: Subdivide edges and offset points randomly perpendicular to edges, mimicking Rough.js aesthetics in pure p5.js.
* **Interactive Control Mapping**: Continuous mapping of input to animation drivers, combining `map()` with event listeners.

### External Tools & Techniques

* **Off-screen Buffers**: Three `p5.Graphics` layers (`bg`, `rippleBg`, `textureOverlay`) for independent composition of oil-stroke, ripple, and grain layers.
* **Blend Modes & Grain Overlay**: 100,000 semi-transparent dots on a grain layer, composited with `blendMode(OVERLAY)` to unify textures.
* **Responsive Canvas Scaling**: CSS transform alongside `windowResized()` and `resizeCanvas()` to preserve aspect ratio across viewports.

## 7. References & Inspirations

* **The Nature of Code**: Inspiration for noise-driven line work.
* **p5.js Forum Ripple Tutorial**: Guided pixel-array displacement logic (rewritten end-to-end).
* **Rough.js Tutorial**: Conceptual basis for hand-drawn jitter algorithms.

---

*Enjoy exploring the interactive oil-painting cow!*
