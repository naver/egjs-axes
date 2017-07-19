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
{% for dist in site.data.egjs.dist %}
<script src="//{{ site.data.egjs.github.user }}.github.io/{{ site.data.egjs.github.repo }}/{{ dist }}"></script>
{% endfor %}
```

##### ES6+
```js
import Axes from "@egjs/axes";
```

### Initialize

#### ES5
```js
// create eg.Axes with option
var axes = new eg.Axes("#area", {
  axis: {
		left: { range: [0, 100] },
		top: { range: [0, 100] }
	}
});

// create InputType
var hammerType = new eg.Axes.HammerInputType("#area", {
  scale: [1, 1.5]
});

// add innputType at axes
axes.connect(["left", "top"], hammerType);
```

#### ES6
```js
// create eg.Axes with option
const axes = new Axes("#area", {
  axis: {
		left: { range: [0, 100] },
		top: { range: [0, 100] }
	}
});

// create InputType
const hammerType = new Axes.HammerInputType("#area", {
  scale: [1, 1.5]
});

// add innputType at axes
axes.connect(["left", "top"], hammerType);
```
