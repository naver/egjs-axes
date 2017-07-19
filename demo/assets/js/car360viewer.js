(function () {
	var images = Array.prototype.slice.call(document.querySelectorAll(
		".car_rotate img"));
	var imagesNum = images.length;
	var ape = 360 / imagesNum; // angle per each

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
	});
	axes.connect("angle", new eg.Axes.HammerInput(".car_rotate"));
})();
