var viewport = document.querySelector(".viewport");
var camera = document.querySelector(".camera");
var input = new eg.Axes.PanInput(viewport, {
	scale: [1, 1],
	inputType: ["touch", "mouse"],
	preventClickOnDrag: true,
	preventDefaultOnDrag: true,
});
var axes = new eg.Axes(
  {
    x: {
      range: [-1000, 0],
	  startPos: 0,
    },
  },
).on("change", function (e) {
	camera.style.transform = "translateX(" + e.pos.x + "px)";
});

axes.connect(["x"], input);
