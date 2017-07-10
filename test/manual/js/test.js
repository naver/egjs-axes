/**
 * Copyright (c) NAVER Corp.
 */


var axes = new eg.Axes({
	interruptable: true,
	axis: {
		x: {
			range: [0, 300],
			bounce: 100,
			margin: [0, 0],
			circular: false
		},
		y: {
			range: [0, 500],
			bounce: 100,
			margin: 0,
			circular: false
		}
	}
}).on({
	"hold": (e) => {
		// console.info("hold", e.pos);
	},
	"release": (e) => {
		console.warn("release", e.depaPos, "=>", e.destPos);
	},
	"change": (e) => {
		// console.info("change", e.pos, e);
		pointer.style[eg.Axes.TRANSFORM] = `translate(${e.pos.x}px, ${e.pos.y}px)`;
	},
	"animationStart": (e) => {
		console.warn("animationStart-", e.duration);
		if (e.duration === 0) {
			debugger;
		}
		// console.info("animationStart", e);
	},
	"animationEnd": (e) => {
		console.warn("animationEnd");
	}
})

var pointer = document.querySelector(".pointer");
axes.mapInput(["", "x"],
	new eg.Axes.HammerInput(document, {
		scale: [1, 1]
	})
);

axes.setTo({
	x: 10,
	y: 10
});
console.log("Hello eg.Axes!!!", axes);



