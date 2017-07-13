(function() {
	var box = document.getElementById("box");
	var axes = new eg.Axes({
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
	}).on("change", function(e) {
		box.style[eg.Axes.TRANSFORM] = "rotateY(" + e.pos.rotateX + "deg) rotateX(" + e.pos.rotateY + "deg)";
	}).mapInput(["rotateX", "rotateY"], new eg.Axes.HammerInput("#area"))
	.setTo({
		"rotateX": 40,
		"rotateY": 315
	}, 100);
})();

