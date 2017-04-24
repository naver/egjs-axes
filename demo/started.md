### Browser support
IE 10+, latest of Chrome/FF/Safari, iOS 7+ and Android 2.3+ (except 3.x)

### Quick steps to use:


#### Set up your HTML

``` html
<div id="area">
```

#### Load files or import library


##### ES5
``` html
<script src="http://naver.github.io/egjs-movablecoord/dist/movablecoord.pkgd.min.js"></script>
```

##### ES6+
```js
import MovableCoord from "@egjs/movablecoord";
```

### Initialize

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
