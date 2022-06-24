/**
 * Copyright (c) NAVER Corp.
 */
var log = document.getElementById("log");
var isStop = false;
function addLog(msg) {
    log.innerHTML = msg + "\n" + log.innerHTML;
}
document.getElementById("clear").addEventListener("click", function(e) {
    log.innerHTML = "";
});

document.getElementById("stop").addEventListener("click", function(e) {
	setTimeout(function () {
		isStop = true;
	}, 1000);
});

var dot = document.getElementById("dot");
var areaContent = document.getElementById("area-content");
var axes = new eg.Axes({
	x: {
		range: [0, 150],
		bounce: 50
	},
	y: {
		range: [0, 200],
		bounce: 100
	},
	z: {
		range: [1, 10],
	}
}, {
  deceleration : 0.0024
}).on({
	"hold" : function(evt) {
		addLog("[hold] " + JSON.stringify(evt.pos));
	},
	"release" : function(evt) {
		addLog("[release] " + JSON.stringify(evt.depaPos) + " => " + JSON.stringify(evt.destPos) + "(" + evt.duration + "ms)");
		console.log("setTo on release");
	},
	"animationStart" : function(evt) {
		addLog("[animationStart ==>]");
	},
	"animationEnd" : function(evt) {
		addLog("[==> animationEnd] " + JSON.stringify(this.get()));
	},
	"finish": function(evt) {
		addLog("[finish] " + JSON.stringify(this.get()));
	},
	"change" : function(evt) {
		var pos = evt.pos;
		console.log(pos.x);
		if(evt.holding && evt.delta.z) {
			areaContent.style[eg.Axes.TRANSFORM] = "scale(" +  evt.pos.z + ")";
		} else {
			dot.style[eg.Axes.TRANSFORM] = "translate(" + pos.x + "px," + pos.y + "px)";
		}

		if (isStop) {
			isStop = false;
			evt.stop();
		}
	}
});

var panInputArea = new eg.Axes.PanInput("#area", {
	scale: [0.5, 1]
});
var panInputHmove = new eg.Axes.PanInput("#hmove");
var panInputVmove = new eg.Axes.PanInput("#vmove");
var pinchInputArea = new eg.Axes.PinchInput("#area", {
	scale: 1.5
});

axes
	.connect("x y", panInputArea)
	.connect("x", panInputHmove)
	.connect(" y", panInputVmove)
	.connect("z", pinchInputArea);
