# Cow Animation-User Input
# Creative coding major project
# ruli0028_9103_tut09

## Introduction
This project is my personal reinterpretation of our group-coded ASCII cow visualization using **user input (mouse & keyboard)** as the core animation drivers. It is built with p5.js and takes inspiration from the abstract artwork "Untitled (Bull)" by Elaine de Kooning, which I selected at the beginning of the assignment.  
Move your mouse to control background ripple and cow-leg swing; press **Space** to toggle the high-contrast animation mode and experience an interactive, rhythm-driven artwork.

> **如何启动与互动**  
- 打开 `index.html`（或 `sketch.js`）所在页面  
- 在画面上 **移动鼠标**：  
  - 鼠标水平移动 ⇒ 控制背景抖动强度  
  - 鼠标垂直移动 ⇒ 控制牛腿摆动幅度  
- 按下任意键（Space / Enter） ⇒ 切换增强动画模式

## 2. 个人动画方案
- **驱动方式**：User Input（鼠标+键盘）  
- **与组内区别**：  
  - 我的版本基于「交互触发」，通过鼠标位置实时调整动画参数；  
  - 其他同学分别使用了音频、Perlin 噪声、定时器等方式，效果各异。

## 3. 动画属性与差异化
| 动画属性                | 我的实现（User Input）                           | 他人示例               |
|:-----------------------|:-----------------------------------------------|:----------------------|
| 背景抖动强度            | 根据鼠标 **X 轴** 位置 线性映射                   | Perlin 噪声随机驱动    |
| 牛腿摆动幅度            | 根据鼠标 **Y 轴** 位置 线性映射                   | 定时器周期性摆动        |
| 按键切换“高对比”模式    | 按键点击后增加摆动/抖动系数                       | 音频振幅驱动角度变化    |

## 4. 灵感与参考
- **设计灵感**  
  - 交互式数据可视化中常见的鼠标联动［示例截图／链接］  
  - p5.js 官方示例 “Interactive Particles”  
- **代码/技术参考**  
  - `map()` 函数映射鼠标位置 → 动画参数 （来源于：https://p5js.org/reference/#/p5/map）  
  - BlendMode OVERLAY 实现叠加效果 （MDN 文档）

## 5. 技术说明
```js
// keyIsPressed 为 p5.js 全局变量，按键时增加动画幅度
let keyFactor = keyIsPressed ? 1.5 : 1.0;

// 将鼠标 X/Y 映射到抖动和摆动幅度
let mxFactor = map(mouseX, 0, width, 0.5, 2);
let myFactor = map(mouseY, 0, height, 0.5, 2);
