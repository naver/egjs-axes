(function() {
  const IMAGE_SIZE = 4500;
  const wrapper = document.getElementById("zoomWrapper");
  const wrapperSize = wrapper.getBoundingClientRect().width;
  wrapper.style.height = wrapperSize + "px";
  const imageView = document.getElementById("subway");

  const baseScale = wrapperSize / IMAGE_SIZE;
  let basePos = -(IMAGE_SIZE/(2 * baseScale) - IMAGE_SIZE/2);

  const axes = new eg.Axes({
		axis: {
			x: {
        range: [0, 0],
        bounce: 50
			},
			y: {
				range: [0, 0],
				bounce: 50
      },
      zoom: {
        range: [baseScale, 1]
      }
    },
    deceleration: 0.003
    // minimumDuration: 300
  })
  .on("change", ({pos, delta, inputEvent, set}) => {
    if(inputEvent && delta.zoom) {
      // https://stackoverflow.com/questions/2916081/zoom-in-on-a-point-using-scale-and-translate
      const beforeZoom = pos.zoom - delta.zoom;
      const newX = pos.x - (inputEvent.layerX/pos.zoom - inputEvent.layerX/beforeZoom);
      const newY = pos.y - (inputEvent.layerY/pos.zoom - inputEvent.layerY/beforeZoom);
      set({x: newX, y: newY});
      imageView.style[eg.Axes.TRANSFORM] = `scale(${pos.zoom}) translate(${-newX}px, ${-newY}px) `;

      // change view
      axes.options.axis.x.range[1] = axes.options.axis.y.range[1] = parseInt(imageView.getBoundingClientRect().width + wrapperSize, 10);
    } else {
      imageView.style[eg.Axes.TRANSFORM] = `scale(${pos.zoom}) translate(${-pos.x}px, ${-pos.y}px) `;
    }
  });
  axes.connect("zoom", new eg.Axes.WheelInput(wrapper, {
    scale: -Math.abs(baseScale)
  })).connect("x y", new eg.Axes.PanInput(wrapper, {
    scale: [-1, -1]
  }));
})();
