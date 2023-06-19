const box = document.getElementById("box");

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
axes.connect("rotateX rotateY", new eg.Axes.PanInput("#area")).connect("rotateX rotateY", new eg.Axes.MoveKeyInput("#area", {scale: [10, -10]}));

// 4. move to position
axes.setTo({
	"rotateX": 40,
	"rotateY": 315
}, 100);
