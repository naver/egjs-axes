### What is the eg.Axes?

{% include_relative assets/html/axes.html %}

```js
const axes = new eg.Axes({
  axis: {
    panX: {
      range: [0, size[0]],
      bounce: 20
    },
    panY: {
      range: [0, size[1]],
      bounce: 20
    },
    zoom: {
      range: [1, 5],
      bounce: 1
    }
  },
  minimumDuration: 300
}).on({
  "hold": event => !SUPPORT_TOUCH && pan.classList.add("blinking"),
  "change": ({pos, delta, holding}) => {
    if (delta.panX || delta.panY) {
      pan.textContent = 
        `panX: ${(+pos.panX.toFixed(0))}, panY: ${(+pos.panY.toFixed(0))}`;
      if (holding && !pan.classList.contains("blinking")) {
        pan.classList.add("blinking");
      }
    }
    if (delta.zoom) {
      zoom.textContent = `zoom: ${pos.zoom.toFixed(2)}`;
      !zoom.classList.contains("blinking") && zoom.classList.add("blinking");
    }
    gridView.render(pos.panX, pos.panY, pos.zoom);
    ui.style[eg.Axes.TRANSFORM] = 
      `translate(${pos.panX}px, ${pos.panY}px) scale(${pos.zoom})`;
  },
  "release": event => stopBlinking(event),
  "animationEnd": () => stopBlinking()
});
const gridView = new AxesGridView(grid,
  axes.options.axis.panX,
  axes.options.axis.panY,
  axes.options.axis.zoom);
axes.connect("panX panY", new eg.Axes.PanInput(delegateTarget))
  .connect("zoom", SUPPORT_TOUCH ?
    new eg.Axes.PinchInput(delegateTarget) :
    new eg.Axes.WheelInput(delegateTarget))
  .setTo({panX: size[0]/2 + 20, panY: size[1]/2});
```

### Car 360º viewer

{% include_relative assets/html/car360viewer.html %}

```js
const axes = new eg.Axes({
  axis: {
    angle: {
      range: [0, 360],
      circular: true
    }
  },
  deceleration: 0.01
}).on("change", ({pos}) => {
  const index = Math.min(Math.round(pos.angle % 360 / ape), imagesNum - 1);
  images.map((v, i) => {
    v.style.display = i === index ? "inline-block" : "none";
  });
});
axes.connect("angle", new eg.Axes.PanInput(".car_rotate"));
```

### Cards in hands

{% include_relative assets/html/cardinhand.html %}

```javascript
const axes = new eg.Axes({
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
}).on("change", ({pos}) => {
  let cardDistance;
  let cardOffset;
  let currentRotateZ;
  movableDot.style["bottom"] = `${-1.4 * pos.top}px`;
  movableDot.style[transform] = `translateX(${pos.hand * 2.3}px)`;
  hand.style[transform] = `rotateZ(${pos.hand}deg)`;
  cards.forEach((v) => {
    cardDistance = getCardDistance(v, hand).distance;
    cardOffset = pos.top;
    currentRotateZ = v.style[transform].split("translateY")[0];
    v.style[transform] =
      `${currentRotateZ} translateY(${parseFloat(v.getAttribute("data-cardOffset")) + pos.top}px)`;
  });
}).connect("hand top", new eg.Axes.PanInput(hand, {
  scale: [0.3, 0.8]
})).setTo({
  hand: (handRotMin + handRotMax) / 2
});
```
### Rotate a Cube

{% include_relative assets/html/cube.html %}

```js
const box = document.getElementById("box");
const axes = new eg.Axes({
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
}).on("change", ({pos}) => {
  box.style[eg.Axes.TRANSFORM] =
    `rotateY(${pos.rotateX}deg) rotateX(${pos.rotateY}deg)`;
}).connect("rotateX rotateY", new eg.Axes.PanInput("#area"))
.setTo({
  "rotateX": 40,
  "rotateY": 315
}, 100);
```

### Mini Map

{% include_relative assets/html/minimap.html %}

```js
const axes = new eg.Axes({
  axis: {
    rawX: {
      range: [0, RAW_IMAGE_WIDTH - viewRect.width],
      bounce: 100
    },
    rawY: {
      range: [0, RAW_IMAGE_HEIGHT - viewRect.height],
      bounce: 100
    }
  },
  deceleration: 0.0024
}).on("change", ({pos}) => {
  painting.style[eg.Axes.TRANSFORM] = `translate(${-pos.rawX}px, ${-pos.rawY}px)`;
  pointer.style[eg.Axes.TRANSFORM]
    = `translate(${pos.rawX * scale[0]}px, ${pos.rawY * scale[1]}px)`;
}).connect("rawX rawY", new eg.Axes.PanInput(view, {
  scale: [-1, -1]
}));
```

### Subway Map

{% include_relative assets/html/subway.html %}

```js
const axes = new eg.Axes({
  axis: {
    x: {
      range: [0, 0],
      bounce: 100
    },
    y: {
      range: [0, 0],
      bounce: 100
    },
    zoom: {
      range: [baseScale, 1]
    }
  },
  deceleration: 0.003
}, {
  zoom: baseScale
})
.on("change", ({pos, delta, inputEvent, set}) => {
  if(inputEvent && delta.zoom) {
    const center = SUPPORT_TOUCH ? inputEvent.center : {
      x: inputEvent.layerX,
      y: inputEvent.layerY
    };
    // https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate
    const beforeZoom = pos.zoom - delta.zoom;
    const newX = pos.x - (center.x/pos.zoom - center.x/beforeZoom);
    const newY = pos.y - (center.y/pos.zoom - center.y/beforeZoom);
    set({x: newX, y: newY});
    imageView.style[eg.Axes.TRANSFORM] = `scale(${pos.zoom}) translate(${-newX}px, ${-newY}px) `;

    // change view
    axes.options.axis.y.range[1] = axes.options.axis.x.range[1] = axes.options.axis.x.range[1] - (wrapperSize/pos.zoom - wrapperSize/beforeZoom);
  } else {
    imageView.style[eg.Axes.TRANSFORM] = `scale(${pos.zoom}) translate(${-pos.x}px, ${-pos.y}px) `;
  }
});
axes.connect("zoom", SUPPORT_TOUCH ? 
  new eg.Axes.PinchInput(wrapper) :
  new eg.Axes.WheelInput(wrapper, {
    scale: Math.abs(baseScale)
  })
).connect("x y", new eg.Axes.PanInput(wrapper, {
  scale: [-1, -1]
}));
```
### Controll Video

{% include_relative assets/html/video.html %}

### Pull-Down Refresh

{% include_relative assets/html/pulldownrefresh.html %}

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

{% include_relative assets/html/3dcarousel.html %}