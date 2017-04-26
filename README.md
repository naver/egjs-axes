# egjs-movablecoord
A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions.  
You can implement a user interface by applying the logical coordinates provided. 

## Documentation
* API Documentation
    - Latest: [http://naver.github.io/egjs/latest/doc/eg.MovableCoord.html](http://naver.github.io/egjs/latest/doc/eg.MovableCoord.html)
    - Specific version: [http://naver.github.io/egjs/[VERSION]/doc/eg.MovableCoord.html](http://naver.github.io/egjs/[VERSION]/doc/eg.MovableCoord.html)
* An advanced demo is available here: [http://codepen.io/collection/AKpkGW/](http://codepen.io/collection/AKpkGW/)

## Supported Browsers
The following table shows browsers supported by egjs-movablecoord

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|10+|Latest|Latest|Latest|7+|2.3+(except 3.x)|


## Dependency
egjs-movablecoord has the dependencies for the following libraries:

|[eg.Component]()|[Hammer.JS](http://hammerjs.github.io/)|
|----|----|
|2.0.0+|2.0.4+|

## How to Use
### 1. Make a target element
```html
<!-- Target DOM -->
<div id="area">
```

### 2. Load/import library 
#### ES5
```html
<script src="../node_modules/@egjs/movablecoord/dist/movablecoord.pkgd.min.js"></script>
<!--<script src="../node_modules/hammerjs/hammer.js"></script>-->
<!--[if lte IE 8]><script src="../node_modules/dist/hammerjs.compatible.min.js"></script> <![endif]-->
<!--script src="../node_modules/@egjs/component/dist/component.min.js"></script>
<script src="../node_modules/@egjs/movablecoord/dist/movablecoord.min.js"></script>-->
```

#### ES6+
```js
// import "hammerjs-compatible"; // for IE8
import MovableCoord from "@egjs/movablecoord";
```

#### How to supports IE8  

> The hammerjs supports [IE9+](http://hammerjs.github.io/browser-support/)  
if you want to use hammer.js in IE8, you should include `hammerjs-compatible` before using  
For more information about hammerjs-compatible, please check following link.  
[https://github.com/naver/hammerjs-compatible](https://github.com/naver/hammerjs-compatible)


### 3. Use egjs-movablecoord
#### ES5
```javascript
// create eg.MovableCoord with option
var instance = new eg.MovableCoord("#area", {
  max : [300, 400]
}).bind(el, {
  direction : eg.MovableCoord.DIRECTION_ALL,
  scale: [1, 1.5]
});
```
#### ES6+
```js
// create MovableCoord with option
const instance = new MovableCoord("#area", {
  max : [300, 400]
}).bind(el, {
  direction : MovableCoord.DIRECTION_ALL,
  scale: [1, 1.5]
});
```

## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-movablecoord/issues) page on GitHub.


## License
egjs-movableCoord is released under the [MIT license](http://naver.github.io/egjs/license.txt).

```
Copyright (c) 2015 NAVER Corp.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
