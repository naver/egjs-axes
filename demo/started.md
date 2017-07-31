### Browser support
IE 10+, latest of Chrome/FF/Safari, iOS 7+ and Android 2.3+ (except 3.x)

### Quick steps to use:


#### 1. Set up your HTML

``` html
<div id="area"></div>
```

#### 2. Load files or import library


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

#### 3. Initialize eg.Axes

Initialize eg.Axes. specify the axis to be used.

```js
// create eg.Axes with option
var axes = new eg.Axes("#area", {
  axis: {
    left: { range: [0, 100] },
    top: { range: [0, 100] },
    something: { range: [-200, 200] }
  }
});
```

#### 4. Initialize InputTypes
Create an InputType to associate with the axis of eg.Axes.

Axes provides three inputTypes.
- [eg.Axes.PanInput](./release/latest/doc/eg.Axes.PanInput.html)
- [eg.Axes.PinchInput](./release/latest/doc/eg.Axes.PinchInput.html)
- [eg.Axes.WheelInput](./release/latest/doc/eg.Axes.WheelInput.html)

```js
// create InputTypes
const panInput = new eg.Axes.PanInput("#area", {
  scale: [1, 1.5]
});
const wheelInput = new eg.Axes.WheelInput("#area");
```

#### 5. Connect eg.Axes and InputTypes 

```js
// add innputType at axes
axes.connect("left top", panInput);
axes.connect("something", wheelInput);
```

#### 6. Enjoy!
You can change the value of the axis through touch, mouse or anything else.
