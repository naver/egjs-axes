(function() {
  var IMAGE_SIZE = 4500;
  var wrapper = document.getElementById("zoomWrapper");
  var wrapperSize = wrapper.getBoundingClientRect().width;
  wrapper.style.height = wrapperSize + "px";
  var imageView = document.getElementById("subway");
  var imageViewRect = imageView.getBoundingClientRect();
  var scale = wrapperSize / IMAGE_SIZE;
  imageView.style[eg.Axes.TRANSFORM] = "scale(" + scale + ")";

  var xLast = 0;
  var yLast = 0;

  var axes = new eg.Axes({
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
        range: [scale, 1]
      }
		},
		deceleration: 0.0024
  })
  .on("release", function(e) {
    console.info(e.depaPos, "=>", e.destPos);
  })
  .on("change", function(e) {
    // console.log(e);
    if(e.delta.zoom) {
      // imageView.style[eg.Axes.TRANSFORM] = "translate(" +  newX + "px, " +  newY + "px) scale(" + e.pos.zoom + ")";
      // e.set({x: newX, y: newY});

      // change view
      // imageViewRect = imageView.getBoundingClientRect();
      // this.options.axis.x.range[1] = this.options.axis.y.range[1] = imageViewRect.width - wrapperSize;
    } else if(e.delta.x || e.delta.y) {
      imageView.style[eg.Axes.TRANSFORM] = "translate(" +  (-e.pos.x) + "px, " + (-e.pos.y) + "px) scale(" + e.pos.zoom + ")";
    }
  }).connect("zoom", new eg.Axes.WheelInput(wrapper, {
    scale: Math.abs(scale)
  })).connect("x y", new eg.Axes.PanInput(imageView, {
    scale: [-1, -1]
  }));
})();
