window.console = window.console || {};
var mores = [ 0, 0, 2, 0, 3, 0 ];
var $content = document.getElementById("content");
var inst = new eg.MovableCoord({
  min : [ 0, 0 ],
  max : [ 0, 500 ],
  bounce : 20,
  deceleration : 0.0024
}).on({
  "animationStart" : function(evt) {
    console.warn("animationStart", evt.duration, evt.isBounce);
  },
  "animationEnd" : function(evt) {
    console.warn("animationEnd");
  },
  "hold" : function(evt) {
    console.warn("hold", evt.pos);
  },
  "release" : function(evt) {
    console.warn("release");
    var horz = Math.round(evt.destPos[0] / 100);
    var vert = Math.round(evt.destPos[1] / 100);
    var more = mores[vert] || 0;
    var yRange = horz && more ? [ vert*100, vert*100 ] : [ 0, 500 ];

    inst.options.min = [ 0, yRange[0] ];
    inst.options.max = [ more * 100, yRange[1] ];
    evt.destPos[0] = Math.min(
      more * 100,
      Math.round(evt.destPos[0] / 100) * 100
    );
    evt.destPos[1] = vert * 100;
  },
  "change" : function(evt) {
    var pos = evt.pos;
    evt.holding ? console.log("change",pos) :  console.log("animation-change",pos);
    $content.style["left"] = (10-pos[0]) + 'px';
    $content.style["top"] = (90-pos[1]) + "px"
  }
});

inst.bind("#content", {
  direction : eg.MovableCoord.DIRECTION_ALL,
  scale : [ -0.5, -0.5 ]
});