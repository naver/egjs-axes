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

### Wingardium Leviosa

{% include_relative assets/html/magic.html %}

```js
const axes = new eg.Axes({
    axis: {
        xElem: {
            range: [1, maxRange]
        }
    },
    deceleration: 0.0012
})
.on({
    "change": e => {
        previousXelem = previousXelem ? previousXelem : e.pos.xElem;
        let direction = ((e.pos.xElem - previousXelem) > 0) ? 1 : -1;
        for (let i = 0; i < boards.length; i++) {
            boards[i].style.left = e.pos.xElem + "px";
            if (e.pos.xElem > maxRange / 2) {
                // Form a cube
                let xDeg = Math.floor(maxRange - e.pos.xElem);
                boards[i].style.top = 50 + "%";
                boards[i].style[eg.Axes.TRANSFORM] = "rotateX(" + xDeg + "deg)";
                if (e.pos.xElem === maxRange) {
                    let shuffledBoards = shuffleArr(boards);
                    shuffledBoards[0].style[eg.Axes.TRANSFORM] = "translate3d(0, 0, 0)";
                    shuffledBoards[1].style[eg.Axes.TRANSFORM] = "translate3d(0, 0, -" + boardWidth + "px)";
                    shuffledBoards[2].style[eg.Axes.TRANSFORM] = "translate3d(-" + boardWidth/2 + "px, 0, -" + boardWidth/2 + "px) rotateY(90deg)";
                    shuffledBoards[3].style[eg.Axes.TRANSFORM] = "translate3d(" + boardWidth/2 + "px, 0, -" + boardWidth/2 + "px) rotateY(90deg)";
                    shuffledBoards[4].style[eg.Axes.TRANSFORM] = "translate3d(0, -" + boardWidth/2 + "px, -" + boardWidth/2 + "px) rotateX(90deg)";
                    shuffledBoards[5].style[eg.Axes.TRANSFORM] = "translate3d(0, " + boardWidth/2 + "px, -" + boardWidth/2 + "px) rotateX(90deg)";
                    boardWrapper.style[eg.Axes.TRANSFORM] = "rotateX(30deg)";
                    break;
                }
            } else {
                // Gather or spread
                switch (i) {
                    case 0:
                    case 1:
                    case 2:
                        boards[i].style.top = boards[i].offsetTop + direction * (3 - i) * (e.pos.xElem / 100) + "px";
                        break;
                    case 3:
                    case 4:
                    case 5:
                        boards[i].style.top = boards[i].offsetTop - direction * (i - 2) * (e.pos.xElem / 100) + "px";
                        break;
                }
            }
        }
        previousXelem = e.pos.xElem;
  },
    "release": e => {
        if (e.depaPos.xElem > maxRange / 2) {
            e.destPos.xElem = maxRange;
        } else {
            e.destPos.xElem = 1;
        }
    }
})
.mapInput("xElem", new eg.Axes.HammerInput("#boardWrapper"));
```
