### Car 360º viewer

{% include_relative assets/html/car360viewer.html %}

```js
var axes = new eg.Axes({
	axis: {
		angle: {
			range: [0, 360],
			circular: true
		}
	},
	deceleration: 0.01
}).on("change", function (e) {
	e.pos.angle < 0 && console.trace("change");
	var index = Math.min(Math.round(e.pos.angle % 360 / ape), imagesNum - 1);
	images.forEach(function (v, i) {
		v.style.display = i === index ? "inline-block" : "none";
	});
}).mapInput("angle", new eg.Axes.HammerInput(".car_rotate"));
```

### Cards in hands

{% include_relative assets/html/cardinhand.html %}

```javascript
var axes = new eg.Axes({
	axis: {
		hand: {
			range: [handRotMin, handRotMax],
			bounce: 15
		},
		top: {
			range: [0, 0],
			bounce: [40, 160]
		},
	},
	deceleration: 0.00034
}).on("change", function (evt) {
	var cardDistance;
	var cardOffset;
	var currentRotateZ;
	var pos = evt.pos;

	movableDot.style["bottom"] = -1.4 * pos.top + "px";
	movableDot.style[transform] = "translateX(" + (pos.hand * 2.3) + "px)";
	hand.style[transform] = "rotateZ(" + pos.hand + "deg)";
	cards.forEach(function (v) {
		cardDistance = getCardDistance(v, hand).distance;
		cardOffset = pos.top;
		currentRotateZ = v.style[transform].split("translateY")[0];
		v.style[transform] = currentRotateZ +
			"translateY(" + (parseFloat(v.getAttribute("data-cardOffset")) +
				pos.top) + "px)";
	});
}).mapInput(["hand", "top"], new eg.Axes.HammerInput(hand, {
	scale: [0.3, 0.8]
})).setTo({
	hand: (handRotMin + handRotMax) / 2
});
```

### Rotate a Cube

{% include_relative assets/html/cube.html %}

```js
var box = document.getElementById("box");
var axes = new eg.Axes({
	axis: {
		rotateX: {
			range: [0, 360],
			circular: true
		},
		rotateY: {
			range: [0, 360],
			circular: true
		}
	},
	deceleration: 0.0024
}).on("change", function(e) {
	box.style[eg.Axes.TRANSFORM] = "rotateY(" + e.pos.rotateX + "deg) rotateX(" + e.pos.rotateY + "deg)";
}).mapInput(["rotateX", "rotateY"], new eg.Axes.HammerInput("#area"));
.setTo({
	"rotateX": 40,
	"rotateY": 315
}, 100);
```
