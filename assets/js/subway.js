(function() {
  // https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate
  function getZoomedOffset(value, zoom, beforeZoom) {
    return -(value/zoom - value/beforeZoom);
  }
  const SUPPORT_TOUCH = "ontouchstart" in window;
  const IMAGE_SIZE = 3000;
  const wrapper = document.getElementById("zoomWrapper");
  const wrapperSize = wrapper.getBoundingClientRect().width;
  wrapper.style.height = wrapperSize + "px";
  const imageView = document.getElementById("subway");
  const baseScale = wrapperSize / IMAGE_SIZE;

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
})();
