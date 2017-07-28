### What is eg.Axes?


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
}).connect("angle", new eg.Axes.HammerInput(".car_rotate"));
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
}).connect(["hand", "top"], new eg.Axes.HammerInput(hand, {
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
}).connect(["rotateX", "rotateY"], new eg.Axes.HammerInput("#area"));
.setTo({
	"rotateX": 40,
	"rotateY": 315
}, 100);
```

### Mini Map

{% include_relative assets/html/minimap.html %}

```js
var scale = [
  (minimapRect.width - pointerRect.width) / (RAW_IMAGE_WIDTH - viewRect.width),
  (minimapRect.height - pointerRect.height) / (RAW_IMAGE_HEIGHT - viewRect.height)
];
var axes = new eg.Axes({
  axis: {
    rawX: {
      range: [0, RAW_IMAGE_WIDTH - viewRect.width],
      bounce: 50
    },
    rawY: {
      range: [0, RAW_IMAGE_HEIGHT - viewRect.height],
      bounce: 50
    }
  },
  deceleration: 0.0024
}).on("change", function(e) {
  var rawX = e.pos.rawX;
  var rawY = e.pos.rawY;
  painting.style[eg.Axes.TRANSFORM] = "translate3d(" + (-rawX) + "px," + (-rawY) + "px, 0)";
  pointer.style[eg.Axes.TRANSFORM] = "translate3d(" + (rawX * scale[0]) + "px," + (rawY * scale[1]) + "px, 0)";
}).connect("rawX rawY", new eg.Axes.PanInput(view, {
  scale: [-1, -1]
}));
```

### Subway Map

{% include_relative assets/html/subway.html %}

### Controll Video


### Pull-Down Refresh


### Carousel

{% include_relative assets/html/carousel.html %}

```js
const axes = new eg.Axes({
	axis: {
		detailX: {
			range: [0, DEFAULT_DETAIL_X]
		},
		detailY: {
			range: [0, DEFAULT_DETAIL_X]
		},
		carousel: {
			range: [BASE - (PANEL_WIDTH * (LAST_PANEL_IDX - 1)), BASE],
		},
	},
	deceleration: 0.007,
}).on({
	"hold": ({inputEvent}) => {
		if (inputEvent.target.parentNode.parentNode.id === "carousel-area") {
			axes.setTo({
				detailX: DEFAULT_DETAIL_X / 2,
				detailY: DEFAULT_DETAIL_Y / 2,
			}, 300);
			detailViewImg.style[eg.Axes.TRANSFORM] = `scale(1)`;
			scaleRatio = 1;
			adjustRangeOfDVAxes();
		}
	},
	"change": ({pos}) => {
		const move = pos.carousel;
		const idx = getIdx(move);
		carouselArea.style[eg.Axes.TRANSFORM] = `translateX(${move}px)`;
		removeSpotlight(FIRST_PANEL_IDX, LAST_PANEL_IDX);
		if (idx >= FIRST_PANEL_IDX && idx <= LAST_PANEL_IDX) {
			boxElmCache[idx].style[eg.Axes.TRANSFORM] = `scale(1.2)`;
			boxElmCache[idx].classList.remove("box-inactive");
			removeSpotlight(idx - 1, idx + 1);
			detailViewImg.src = imgSrcCache[idx];
			if (scaleRatio > MIN_SACLE) {
				detailViewArea.style[eg.Axes.TRANSFORM] = 
				`translateX(${-pos.detailX}px) translateY(${-pos.detailY}px)`;
			}
		}
	},
	"release": ({destPos}) => {
		const idx = getIdx(destPos.carousel);
		destPos.carousel = ((idx - 1) * PANEL_WIDTH * -1) + BASE;
	},
})
.connect(
	["detailX", "detailY"],
	new eg.Axes.HammerInput("#detail-view-carousel-container", {
		scale: [-AXES_SCALE, -AXES_SCALE],
	}))
.connect(
	"carousel",
	new eg.Axes.HammerInput("#carousel-container", {
		scale: [AXES_SCALE, 0]
	}))
.setTo({
	detailX: DEFAULT_DETAIL_X / 2,
	detailY: DEFAULT_DETAIL_Y / 2,
	carousel: BASE - (INITIAL_POS * PANEL_WIDTH),
});
```

### 3D Carousel