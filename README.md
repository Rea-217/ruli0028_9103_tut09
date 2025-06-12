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
