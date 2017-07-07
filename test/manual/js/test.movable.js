/**
 * Copyright (c) NAVER Corp.
 */

var TRANSFORM = (function() {
    var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
    var target = [ "transform", "webkitTransform", "msTransform", "mozTransform" ];
    for(var i=0, len=target.length; i<len; i++) {
        if(target[i] in bodyStyle) {
            return target[i];
        }
    }
    return "";
})();

var mv = new eg.MovableCoord({
	min: [0, 0],
	max: [300, 500],
	bounce: [50, 100, 50, 100],
	circular: [true, false, true, false],
  deceleration: 0.001,
}).on({
	"hold": (e) => {
		console.info("hold", e.pos);
	},
	"release": (e) => {
		console.info("release", e.depaPos, "=>", e.destPos);
	},
	"change": (e) => {
		// console.info("change", e.pos, e);
		pointer.style[TRANSFORM] = `translate(${e.pos[0]}px, ${e.pos[1]}px)`;
	},
	"animationStart": (e) => {
    console.time("Animation");
		// console.info("animationStart", e);
	},
	"animationEnd": (e) => {
    console.timeEnd("Animation");
	}
})
var pointer = document.querySelector(".pointer");
mv.bind(document, {
	scale: [1, 1]
});
mv.setTo(10, 20);
console.log("Hello eg.MovableCoord!!!", mv);
