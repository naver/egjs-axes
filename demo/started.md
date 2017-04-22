### Browser support
IE 10+, latest of Chrome/FF/Safari, iOS 7+ and Android 2.3+ (except 3.x)

### Quick steps to use:

#### Load files

``` html
<script src="http://naver.github.io/egjs-movablecoord/dist/movablecoord.pkgd.min.js"></script>
```

#### Set up your HTML

``` html
<div id="area">
```

### Initialize
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
