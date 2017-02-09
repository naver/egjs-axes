# eg.MovableCoord
A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions.  
You can implement a user interface by applying the logical coordinates provided. 

## Documentation
* API Documentation
    - Latest: [http://naver.github.io/egjs/latest/doc/eg.MovableCoord.html](http://naver.github.io/egjs/latest/doc/eg.MovableCoord.html)
    - Specific version: [http://naver.github.io/egjs/[VERSION]/doc/eg.MovableCoord.html](http://naver.github.io/egjs/[VERSION]/doc/eg.MovableCoord.html)
* An advanced demo is available here: [http://codepen.io/collection/AKpkGW/](http://codepen.io/collection/AKpkGW/)

## Supported Browsers
The following table shows browsers supported by eg.MovableCoord

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|10+|Latest|Latest|Latest|7+|2.3+(except 3.x)|



## Dependency
eg.MovableCoord has the dependencies for the following libraries:

|[eg.Component]()|[Hammer.JS](http://hammerjs.github.io/)|
|----|----|
|2.0.0+|2.0.4+|

## How to Use
### 1. Load dependency library before movablecoord.js (or movablecoord.min.js) load.
```html
<script src="../node_modules/@egjs/component/dist/component.js"></script>
<script src="../node_modules/hammerjs/hammer.js"></script>
```
> #### How to supports IE8  
> The hammerjs supports [IE9+](http://hammerjs.github.io/browser-support/)  
if you want to use hammer.js in IE8, you should include `hammerjs-compatible` before using  
For more information about hammerjs-compatible, please check following link.  
[https://github.com/naver/hammerjs-compatible](https://github.com/naver/hammerjs-compatible)


### 2. Load movablecoord.js
```html
<script src="../dist/movablecoord.js"></script>
```

### 3. Make a target element
```html
<!-- Target DOM -->
<div id="area">
```

### 4. Use eg.MovableCoord
```javascript
// create MovableCoord with option
var instance = new eg.MovableCoord("#area", {
  max : [ 300, 400 ]
});

// call bind method
instance.bind(el, {
  direction : eg.MovableCoord.DIRECTION_ALL,
  scale: [1, 1.5]
});

// call unbind method
instance.unbind(el);
```

## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/naver/egjs-movablecoord/issues) page on GitHub.


## License
eg.MovableCoord is released under the [MIT license](http://naver.github.io/egjs/license.txt).

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
