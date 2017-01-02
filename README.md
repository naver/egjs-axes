# eg.MovableCoord
A module used to change the information of user action entered by various input devices such as touch screen or mouse into logical coordinates within the virtual coordinate system. The coordinate information sorted by time events occurred is provided if animations are made by user actions. You can implement a user interface by applying the logical coordinates provided. For more information on the eg.MovableCoord module, see demos.


* Usage Examples of egjs: http://codepen.io/collection/AKpkGW/
* API Documentation
    - Latest: http://naver.github.io/egjs/latest/doc/eg.MovableCoord.html
    - Specific version: http://naver.github.io/egjs/[VERSION]/doc/eg.MovableCoord.html

## Supported Browsers

The following table shows browsers supported by eg.MovableCoord

|Internet Explorer|Chrome|Firefox|Safari|iOS|Android|
|---|---|---|---|---|---|
|10+|Latest|Latest|Latest|7+|2.3+(except 3.x)|


## Dependency
egjs has the dependencies for the following libraries:

|[Hammer.JS](http://hammerjs.github.io/)|
|----|
|2.0.4+|


Let egjs load after jQuery loads.

```html
...
<!-- Load jQuery -->
<!-- Load egjs packaged with all dependencies (Hammer.js) -->
<!-- Load from your local installation -->
<script src="bower_components/egjs/dist/pkgd/eg.pkgd.min.js"></script>

<!-- Or load from CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/egjs/1.3.0/pkgd/eg.pkgd.min.js"></script>
<div id="area">
...
```


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

If you find a bug, please report it to us using the [Issues](https://github.com/naver/eg.movableCoord/issues) page on GitHub.


## License
egjs is released under the [MIT license](http://naver.github.io/egjs/license.txt).

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
