(function() {
  // raw-image 1280 * 1677
  var RAW_IMAGE_WIDTH = 1280;
  var RAW_IMAGE_HEIGHT = 1677;
  // mini-map 128 * 167.7
  var MINIMAP_WIDTH = 128;
  var IMAGE_RATE = RAW_IMAGE_HEIGHT / RAW_IMAGE_WIDTH;

  var painting = document.getElementById("rawImage");
  var view = document.getElementById("imageView");
  var viewWidth = view.getBoundingClientRect().width;
  view.style.height = (viewWidth * IMAGE_RATE) + "px";
  var viewRect = view.getBoundingClientRect();
  var minimap = document.getElementById("minimap"); // 1/10
  var minimapRect = minimap.getBoundingClientRect();
  var pointer = document.getElementById("minimap-pointer");
  var pointerWidth = viewWidth/RAW_IMAGE_WIDTH * MINIMAP_WIDTH;
  pointer.style.width = pointerWidth + "px";
  pointer.style.height = (pointerWidth * IMAGE_RATE) + "px";
  var pointerRect = pointer.getBoundingClientRect();
  
  var scale = [
    (minimapRect.width - pointerRect.width) / (RAW_IMAGE_WIDTH - viewRect.width),
    (minimapRect.height - pointerRect.height) / (RAW_IMAGE_HEIGHT - viewRect.height)
  ];
	var axes = new eg.Axes({
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
	}).on("change", function(e) {
    var rawX = e.pos.rawX;
    var rawY = e.pos.rawY;
    painting.style[eg.Axes.TRANSFORM] = "translate3d(" + (-rawX) + "px," + (-rawY) + "px, 0)";
    pointer.style[eg.Axes.TRANSFORM] = "translate3d(" + (rawX * scale[0]) + "px," + (rawY * scale[1]) + "px, 0)";
  }).connect("rawX rawY", new eg.Axes.PanInput(view, {
    scale: [-1, -1]
  }));
})();
