
var viewport = document.querySelector(".viewport.vertical");
var camera = document.querySelector(".camera.vertical");
var input = new eg.Axes.PanInput(viewport, {
	scale: [1, 1],
	inputType: ["touch", "mouse"],
	preventClickOnDrag: true,
	preventDefaultOnDrag: true,
});
var axes = new eg.Axes(
	{
		y: {
			range: [-1000, 0],
			startPos: 0,
		},
	},
).on("change", function (e) {
	camera.style.transform = "translateY(" + e.pos.y + "px)";
});

axes.connect(["", "y"], input);


document.querySelectorAll(".viewport.horizontal").forEach(child => {
	var camera = child.querySelector(".camera");
	var input = new eg.Axes.PanInput(child, {
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
});