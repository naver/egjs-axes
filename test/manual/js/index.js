/**
 * Copyright (c) NAVER Corp.
 */
var log = document.getElementById("log");
function addLog(msg) {
    log.innerHTML = msg + "\n" + log.innerHTML;
}
document.getElementById("clear").addEventListener("click", function(e) {
    log.innerHTML = "";
});

var dot = document.getElementById("dot");
var hammerInputArea = new eg.Axes.HammerInput("#area", {
	scale: [0.5, 1]
});
var hammerInputHmove = new eg.Axes.HammerInput("#hmove");
var hammerInputVmode = new eg.Axes.HammerInput("#vmove");
var axes = new eg.Axes({
	axis: {
		x: {
			range: [0, 150],
			bounce: 50
		},
		y: {
			range: [0, 200],
			bounce: 100
		}
	},
  deceleration : 0.0024
}).on({
	"hold" : function(evt) {
		addLog("[hold] " + JSON.stringify(evt.pos));
	},
	"release" : function(evt) {
		addLog("[release] " + JSON.stringify(evt.destPos));
	},
	"animationStart" : function(evt) {
		addLog("[animationStart ==>]");
	},
	"animationEnd" : function(evt) {
		addLog("[==> animationEnd]");
	},
	"change" : function(evt) {
		var pos = evt.pos;
		dot.style[eg.Axes.TRANSFORM] = "translate(" + pos.x + "px," + pos.y + "px)";
	}
});


axes.mapInput(["x", "y"], hammerInputArea)
	.mapInput(["x"], hammerInputHmove)
	.mapInput(["", "y"], hammerInputVmode);
