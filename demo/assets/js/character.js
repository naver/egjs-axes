
// 1. Initialize eg.Axes
var body = document.querySelector("body");
var target = document.querySelector(".character");
const chracter = {
	legLeft: target.querySelector(".leg.left"),
	legRight: target.querySelector(".leg.right"),
	armLeft: target.querySelector(".arm.left"),
	armRight: target.querySelector(".arm.right"),
}
var axes = new eg.Axes({
	posX: {
		range: [0, 96],
	},
	posY: {
		range: [0, 96],
	}
});

axes.on({
	"change": function (e) {
		var pos = e.pos;
		var delta = e.delta;
		var classList = target.classList;
		var posX = pos.posX;
		var posY = pos.posY;

		console.log(pos);

		if (delta.posX < 0) {
			classList.add("left");
		} else if (delta.posX > 0) {
			classList.remove("left");
		}
		if (0 <= posX && posX < 32) {
			classList.add("grin");
			classList.remove("angry");
		} else if(posX < 64) {
			classList.remove("grin");
			classList.remove("angry");
		} else {
			classList.add("angry");
			classList.remove("grin");
		}
		var level = Math.abs((posX + posY) % 16 -8);

		target.style.left = posX / 96 * 80 + "%";
		target.style.marginBottom = (posY * 3 + (8 - level) * 5) + "px";
		chracter.legLeft.style[eg.Axes.TRANSFORM] = "rotate(" + (8 - level) * 10 + "deg)";
		chracter.legRight.style[eg.Axes.TRANSFORM] = "rotate(" + -(8 - level) * 12 + "deg)";
		chracter.armLeft.style[eg.Axes.TRANSFORM] = "rotate(" + (9 - level) * 12 + "deg)";
		chracter.armRight.style[eg.Axes.TRANSFORM] = "rotate(" + -(9 - level) * 12 + "deg)";
	}
})

axes.connect("posX posY", new eg.Axes.MoveKeyInput(body, {
	scale: [2, 2],
}));

axes.setTo({posX: 32});