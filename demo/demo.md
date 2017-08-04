### What is the eg.Axes?

{% include_relative assets/html/axes.html %}

```js
// 1. Initialize eg.Axes
const axes = new eg.Axes({
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
}, {
  minimumDuration: 300
});

// 2. attach event handler
axes.on({
  "hold": event => !SUPPORT_TOUCH && pan.classList.add("blinking"),
  "change": ({pos, delta, holding}) => {
    if (delta.panX || delta.panY) {
      pan.textContent = 
        `panX: ${(+pos.panX.toFixed(0))}, panY: ${(+pos.panY.toFixed(0))}`;
      holding && !pan.classList.contains("blinking") &&
          pan.classList.add("blinking");
    }
    if (delta.zoom) {
      zoom.textContent = `zoom: ${pos.zoom.toFixed(2)}`;
      !zoom.classList.contains("blinking") && zoom.classList.add("blinking");
    }
    gridView.render(pos.panX, pos.panY, pos.zoom);
    ui.style[eg.Axes.TRANSFORM] = 
      `translate3d(${pos.panX}px, ${pos.panY}px, 0) scale(${pos.zoom})`;
  },
  "release": event => stopBlinking(event),
  "animationEnd": () => stopBlinking()
});

// 3. Initialize inputTypes and connect it
axes.connect("panX panY", new eg.Axes.PanInput(delegateTarget))
  .connect("zoom", SUPPORT_TOUCH ?
    new eg.Axes.PinchInput(delegateTarget) :
    new eg.Axes.WheelInput(delegateTarget));

// 4. move to position 
axes.setTo({panX: size[0]/2 + 20, panY: size[1]/2});
```

### Car 360º viewer

{% include_relative assets/html/car360viewer.html %}

```js
// 1. Initialize eg.Axes
const axes = new eg.Axes({
  angle: {
    range: [0, 360],
    circular: true
  }
}, {
  deceleration: 0.01
});

// 2. attach event handler
axes.on("change", ({pos}) => {
  const index = Math.min(Math.round(pos.angle % 360 / ape), imagesNum - 1);
  images.map((v, i) => {
    v.style.display = i === index ? "inline-block" : "none";
  });
});

// 3. Initialize a inputType and connect it
axes.connect("angle", new eg.Axes.PanInput(".car_rotate"));
```

### Rotate a Cube

{% include_relative assets/html/cube.html %}

```js
// 1. Initialize eg.Axes
const axes = new eg.Axes({
  rotateX: {
    range: [0, 360],
    circular: true
  },
  rotateY: {
    range: [0, 360],
    circular: true
  }
}, {
  deceleration: 0.0024
});

// 2. attach event handler
axes.on("change", ({pos}) => {
  box.style[eg.Axes.TRANSFORM] =
    `rotateY(${pos.rotateX}deg) rotateX(${pos.rotateY}deg)`;
});
  
// 3. Initialize a inputType and connect it
axes.connect("rotateX rotateY", new eg.Axes.PanInput("#area"));

// 4. move to position 
axes.setTo({
  "rotateX": 40,
  "rotateY": 315
}, 100);
```

### 3D Carousel

{% include_relative assets/html/3dcarousel.html %}

```js
// 1. Initialize eg.Axes
const axes = new eg.Axes({
  rotate: {
    range: [0, 360],
    circular: true
  }
});

// 2. attach event handler
axes.on({
  "change": ({pos}) => {
    carousel.style[eg.Axes.TRANSFORM] = "translateZ(-253px) rotateY(" + pos.rotate + "deg)";
  },
  "release": ({destPos, setTo}) => {
    // you can controll animation!
    setTo({"rotate": Math.round(destPos.rotate/ANGLE) * ANGLE} , 500);
  },
});

// 3. Initialize a inputType and connect it
axes.connect("rotate", new eg.Axes.PanInput("#carouselWrapper"));
```

### Cards in hands

{% include_relative assets/html/cardinhand.html %}

```javascript
// 1. Initialize eg.Axes
const axes = new eg.Axes({
  hand: {
    range: [handRotMin, handRotMax],
    bounce: 15
  },
  top: {
    range: [0, 0],
    bounce: [100, 160]
  },
}, {
  deceleration: 0.00034
});

// 2. attach event handler
axes.on("change", ({pos}) => {
  dot.style["bottom"] = `${-1.4 * pos.top}px`;
  dot.style[transform] = `translateX(${pos.hand * 2.3}px)`;
  hand.style[transform] = `rotateZ(${pos.hand}deg)`;
  cards.forEach((v) => {
    v.style[transform] =
      `${v.style[transform].split("translateY")[0]} translateY(${parseFloat(v.getAttribute("data-cardOffset")) + pos.top}px)`;
  });
});

// 3. Initialize a inputType and connect it
axes.connect("hand top", new eg.Axes.PanInput(hand, {
  scale: [0.3, 0.8]
}));
```

### Pull to Refresh

{% include_relative assets/html/pulltorefresh.html %}

```js
// 1. Initialize eg.Axes
const axes = new eg.Axes({
  scroll: {
    range: [0, getMaxRange()],
    bounce: 100
  }
});

// 2. attach event handler
axes.on({
  "change": ({pos}) => {
    content.style[eg.Axes.TRANSFORM] = `translate3d(0, ${-pos.scroll}px, 0)`;
    if (axes.isBounceArea()) {
      const info = getInfo(pos.scroll);
      if (info.isAdd) {
        info.isTop ? (prepend.innerText = "Release to prepend") :
          (append.innerText = "Release to append");
      } else {
        info.isTop ? (prepend.innerText = "Pull to prepend") :
          (append.innerText = "Pull to append");
      }
    }
  },
  "release" : ({depaPos}) => {
    if (axes.isBounceArea()) {
      const info = getInfo(depaPos.scroll);
      if (info.isAdd) {
        const el = getItem();
        info.isTop ? 
          content.insertBefore(el, content.firstChild) :
          content.appendChild(el);
        axes.axis.scroll.range[1] = getMaxRange();
      }
    }
  }
});

// 3. Initialize inputTypes and connect it
axes.connect(["", "scroll"], new eg.Axes.PanInput(contentWrapper, {
  scale : [0, -1]
}));
```
### Mini Map

{% include_relative assets/html/minimap.html %}

```js
// 1. Initialize eg.Axes
const axes = new eg.Axes({
  rawX: {
    range: [0, RAW_IMAGE_WIDTH - viewRect.width],
    bounce: 100
  },
  rawY: {
    range: [0, RAW_IMAGE_HEIGHT - viewRect.height],
    bounce: 100
  }
}, {
  deceleration: 0.0024
});

// 2. attach event handler
axes.on("change", ({pos}) => {
  painting.style[eg.Axes.TRANSFORM] = `translate3d(${-pos.rawX}px, ${-pos.rawY}px, 0)`;
  pointer.style[eg.Axes.TRANSFORM]
    = `translate3d(${pos.rawX * scale[0]}px, ${pos.rawY * scale[1]}px, 0)`;
});
  
// 3. Initialize a inputType and connect it
axes.connect("rawX rawY", new eg.Axes.PanInput(view, {
  scale: [-1, -1]
}));
```

### Subway Map

{% include_relative assets/html/subway.html %}

```js
// 1. Initialize eg.Axes
const axes = new eg.Axes({
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
}, {
  deceleration: 0.003,
  interrutable: false  
}, {
  zoom: baseScale
});

// 2. attach event handler
axes.on("change", ({pos, delta, inputEvent, set}) => {
  if(inputEvent && delta.zoom) {
    const center = SUPPORT_TOUCH ? inputEvent.center : {
      x: inputEvent.layerX,
      y: inputEvent.layerY
    };
    
    const beforeZoom = pos.zoom - delta.zoom;
    const newX = pos.x + getZoomedOffset(center.x, pos.zoom, beforeZoom);
    const newY = pos.y + getZoomedOffset(center.y, pos.zoom, beforeZoom);
    set({x: newX, y: newY});
    imageView.style[eg.Axes.TRANSFORM] =
      `scale(${pos.zoom}) translate3d(${-newX}px, ${-newY}px, 0)`;

    // change view
    axes.axis.y.range[1] = axes.axis.x.range[1] = 
      axes.axis.x.range[1] + getZoomedOffset(wrapperSize, pos.zoom, beforeZoom);
  } else {
    imageView.style[eg.Axes.TRANSFORM] =
      `scale(${pos.zoom}) translate3d(${-pos.x}px, ${-pos.y}px, 0)`;
  }
});

// 3. Initialize inputTypes and connect it
axes.connect("zoom", SUPPORT_TOUCH ? 
  new eg.Axes.PinchInput(wrapper) :
  new eg.Axes.WheelInput(wrapper, {
    scale: Math.abs(baseScale)
  })
).connect("x y", new eg.Axes.PanInput(wrapper, {
  scale: [-1, -1]
}));
```
