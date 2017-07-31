(function() {
  const IMAGE_SIZE = 4500;
  const wrapper = document.getElementById("zoomWrapper");
  const wrapperSize = wrapper.getBoundingClientRect().width;
  wrapper.style.height = wrapperSize + "px";
  const imageView = document.getElementById("subway");
  let imageViewRect = imageView.getBoundingClientRect();

  const baseScale = wrapperSize / IMAGE_SIZE;
  const basePos = -(IMAGE_SIZE/(2 * baseScale) - IMAGE_SIZE/2);

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
    minimumDuration: 300
  })
  .on("change", ({pos, delta, inputEvent, set}) => {
    // if(inputEvent && delta.zoom) {
    //   console.log("org", inputEvent.layerX,inputEvent.layerY, pos.zoom, "(", delta.zoom, ")");
    //   // imageView.style[eg.Axes.TRANSFORM] = "translate(" +  newX + "px, " +  newY + "px) scale(" + e.pos.zoom + ")";
      
    //   const newX = (inputEvent.layerX + ratio);
    //   const newY = (inputEvent.layerY * ratio);
    //   console.log(ratio, ":::" , newX, newY);
    //   set({x: newX, y: newY});
    //   imageView.style[eg.Axes.TRANSFORM] = `scale(${pos.zoom}) translate(${-newX}px, ${-newY}px)`;
    //   imageViewRect = imageView.getBoundingClientRect();
    //   // change view
    //   axes.options.axis.x.range[1] = axes.options.axis.y.range[1] = imageViewRect.width - wrapperSize;
    // } else if(delta.x || delta.y) {
    imageView.style[eg.Axes.TRANSFORM] = `scale(${pos.zoom}) translate(${-pos.x + basePos}px, ${-pos.y + basePos}px)`;
    // }
    
  });
  axes.connect("zoom", new eg.Axes.WheelInput(wrapper, {
    scale: -Math.abs(baseScale)
  })).connect("x y", new eg.Axes.PanInput(wrapper, {
    scale: [-1, -1]
  }));
})();
